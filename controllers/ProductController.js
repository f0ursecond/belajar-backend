import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import axios from "axios";
import { uploadFile } from "@uploadcare/upload-client";
import config from "../config.js";
const secretKey = 'my_secret_key';

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];
        if (!token) return res.status(401).json({ msg: 'Unathorized' });

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) return res.status(401).json({ msg: 'Unauthorized' })
            req.userId = decoded;
            next();
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized: Token expired' });
        }
        return res.status(500).json({ msg: `Internal Server Error cok ${error.message}` });
    }
}

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        const simplifiedResponse = response.map((product) => ({
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
        }));
        res.json(simplifiedResponse);
    } catch (error) {
        console.log(`Error get Products ${error.message}`);
        res.status(400).json({ msg: `Error ${error.message}` })
    }
};

export const getProductByCategory = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                category: req.params.category,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: `Error ${error}` });
        console.log(error.message);
    }
};

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ message: "Product not found" });
        }

        // const responseData = response.toJSON();
        // responseData.image = JSON.parse(responseData.image)
        // responseData.imageUrl = JSON.parse(responseData.imageUrl);
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const saveProduct = async (req, res) => {
    try {
        if (req.files === null)
            return res.status(400).json({ msg: "No File Uploaded" });

        const { title, category } = req.body;
        const filesArray = Array.isArray(req.files.file)
            ? req.files.file
            : [req.files.file];

        const imageArray = [];
        const imageUrl = [];

        for (const file of filesArray) {
            const fileData = file.data;
            const ext = path.extname(file.name);
            // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
            const allowedType = [".png", ".jpg", ".jpeg"];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Invalid Images" });
            }
            if (file.size > 5000000) {
                return res.status(422).json({ msg: "Image must be less than 5 MB" });
            }

            // await file.mv(`./public/images/${fileName}`, (err) => {
            //     if (err) {
            //         console.error(err.message);
            //         return res.status(500).json({ msg: err.message });
            //     }
            // });

            const upload = await uploadFile(fileData, {
                publicKey: '7af6b79bc5d691a949f1',
                store: 'auto',
                fileName: title,
                metadata: {
                    subsystem: 'uploader',
                    pet: 'cat'
                }
            }, (err) => { if (err) return res.json(400).json({ msg: 'Error Upload File' }) })

            imageArray.push({
                upload
            });
            imageUrl.push({
                upload
            })
        }

        let mappedImageArray = imageArray.map(obj => obj.upload.cdnUrl);
        let mappedImageUrl = imageUrl.map(obj => obj.upload.cdnUrl);

        const product = await Product.create({
            name: title,
            category,
            image: mappedImageArray,
            imageUrl: mappedImageUrl,
        });

        const mappedProduct = {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
        }

        res.status(201).json({
            msg: "Products Created Successfully",
            products: mappedProduct,
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: "Error creating products " + error.message });
    }
};

export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!product) return res.status(404).json({ msg: "No Data Found" });

    console.log(`product image ${product.image}`)
    console.log(`product imageurl ${product.imageUrl}`)

    const imageArray = [];
    const imageUrl = [];
    if (req.files !== null) {
        const filesArray = Array.isArray(req.files.file)
            ? req.files.file
            : [req.files.file];
        for (const file of filesArray) {
            const fileData = file.data;
            const ext = path.extname(file.name);
            // const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
            const allowedType = [".png", ".jpg", ".jpeg"];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Invalid Images" });
            }

            if (file.size > 5000000) {
                return res.status(422).json({ msg: "Image must be less than 5 MB" });
            }

            // await file.mv(`./public/images/${fileName}`, (err) => {
            //     if (err) {
            //         console.error(err.message);
            //         return res.status(500).json({ msg: err.message });
            //     }
            // });

            const upload = await uploadFile(fileData, {
                publicKey: '7af6b79bc5d691a949f1',
                store: 'auto',
                fileName: req.body.title,
                metadata: {
                    subsystem: 'uploader',
                    pet: 'cat'
                }
            }, (err) => { if (err) return res.json(400).json({ msg: 'Error Upload File' }) })

            imageArray.push({
                upload,
            });
            imageUrl.push({
                upload
            })
        }
    }

    let mappedImageArray = imageArray.map(obj => obj.upload.cdnUrl);
    let mappedImageUrl = imageUrl.map(obj => obj.upload.cdnUrl)

    const name = req.body.title;
    const category = req.body.category;

    const defaultImageArray = product.image;
    const defaultImageUrlArray = product.imageUrl;

    let isArray = Array.isArray(defaultImageArray) || Array.isArray(defaultImageUrlArray)

    try {
        await Product.update(
            {
                name: name,
                category: category,
                image: req.files === null ? isArray ? defaultImageArray : [] : mappedImageArray,
                imageUrl: req.files === null ? isArray ? defaultImageUrlArray : [] : mappedImageUrl,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
        res.status(400).json({ mesg: 'Update Error' + error.message });
        console.log(error.message);
    }
};

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    let imageUrl = product.imageUrl;
    console.log(imageUrl)
    let splited = imageUrl.map((e) => {
        const segments = e.split('/');
        return segments[segments.length - 2];
    });

    try {
        await Promise.all(splited.map(async (fileId) => {
            console.log('file id cokkk ' + fileId)
            try {
                await axios.delete(`https://api.uploadcare.com/files/${fileId}/`, {
                    headers: {
                        Authorization: `Uploadcare.Simple ${config.KEYUPLOAD}:${config.KEYSECRET}`,
                    },
                });
                console.log('Image Deleted')
            } catch (error) {
                console.error('Error deleting image:', error.message);
            }
        }),);

        await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
};
