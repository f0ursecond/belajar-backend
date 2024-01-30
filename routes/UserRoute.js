import express from "express";
import { login, logout, register } from "../controllers/UserController.js";
import { authenticateToken } from "../controllers/ProductController.js";

const router = express.Router();
router.use('/api/logout', authenticateToken);

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/logout", logout)

export default router;