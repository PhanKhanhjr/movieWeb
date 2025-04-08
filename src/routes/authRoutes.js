import express from "express";
import authController from "../controllers/authController.js";


const router = express.Router();
router.post("/api/v1/login", authController.login);
router.post("/api/v1/logout", authController.logout);
router.post("/api/v1/refresh-token", authController.refreshToken);
export default router;