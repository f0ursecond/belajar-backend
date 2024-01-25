import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();

    const simplifiedResponse = response.map((product) => ({
      id: product.id,
      name: product.name,
      imagecuy: JSON.parse(product.imagecuy),
    }));

    res.json(simplifiedResponse);
  } catch (error) {
    console.log(error.message);
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

    const responseData = response.toJSON();
    responseData.imagecuy = JSON.parse(responseData.imagecuy);
    res.status(200).json(responseData);
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

    const imageUrlArray = [];

    for (const file of filesArray) {
      const { size, name } = file;
      const ext = path.extname(name);
      const fileName = `${file.md5}${ext}`;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Images" });
      }
      if (size > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
      }

      await file.mv(`./public/images/${fileName}`, (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ msg: err.message });
        }
      });

      imageUrlArray.unshift(url);
    }

    const product = await Product.create({
      name: title,
      category,
      image: filesArray[0].md5 + path.extname(filesArray[0].name),
      url: imageUrlArray[0],
      imagecuy: imageUrlArray,
    });

    res.status(201).json({ msg: `Products Created Successfully`, product });
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

  let fileName = "";
  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.update(
      { name: name, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
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

  try {
    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);
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
