import express from "express";
import {
    getProducts,
    getProductByCategory,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";

const router = express.Router();

router.get('/api/products', getProducts);
router.get('/api/products/category/:category', getProductByCategory);
router.get('/api/products/id/:id', getProductById);
router.post('/api/products', saveProduct);
router.patch('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);

export default router;