import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";


const router = express.Router();
router.get("/api/v1/users",userController.getAllUsers);
router.post("/api/v1/users", userController.createUser);
router.delete("/api/v1/users/:id", userController.deleteUser);
router.put("/api/v1/users", userController.updateUser);
router.post("/api/v1/users/changepassword", userController.changePassword);
// router.post("/api/v1/finduser", userController.findById);
export default router;