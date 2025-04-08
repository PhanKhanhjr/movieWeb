import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";


const router = express.Router();
router.get("/api/v1/users",verifyToken.verifyToken, userController.getAllUsers);
router.post("/api/v1/users", userController.createUser);
export default router;