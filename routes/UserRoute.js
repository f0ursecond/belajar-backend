import express from "express";
import { login, logout, register } from "../controllers/UserController.js";
import { authenticateToken } from "../controllers/ProductController.js";

const router = express.Router();

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/logout", authenticateToken, logout)

export default router;