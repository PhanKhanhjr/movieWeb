import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();
router.get("/", UserController.getAllUsers);
router.post("/api/v1/users", UserController.createUser);
export default router;