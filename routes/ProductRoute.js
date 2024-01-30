import express from "express";
import {
  getProducts,
  getProductByCategory,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
  authenticateToken,
} from "../controllers/ProductController.js";

const router = express.Router();
router.use('/api/products', authenticateToken);

router.get("/api/products", getProducts,);
router.get("/api/products/category/:category", getProductByCategory);
router.get("/api/products/id/:id", getProductById);
router.post("/api/products", saveProduct);
router.patch("/api/products/id/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

export default router;
