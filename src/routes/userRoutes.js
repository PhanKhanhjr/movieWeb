import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";


const router = express.Router();
router.get("/api/v1/users",verifyToken.verifyToken, userController.getAllUsers);
router.post("/api/v1/users", userController.createUser);
router.delete("/api/v1/users/:id",verifyToken.verifyToken,verifyToken.requireRole("admin"), userController.deleteUser);
router.put("/api/v1/users", verifyToken.verifyToken, userController.updateUser);
router.post("/api/v1/users/changepassword", verifyToken.verifyToken, userController.changePassword);
export default router;