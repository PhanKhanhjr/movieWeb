import express from 'express';
import commentController from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route để tạo comment, chỉ cho phép người dùng đã đăng nhập
router.post("/:tmdbId", authMiddleware.verifyToken, commentController.createComment);
router.put("/:tmdbId/comment/:commentId", authMiddleware.verifyToken, commentController.updateComment);
router.delete("/:tmdbId/comment/:commentId", authMiddleware.verifyToken, commentController.deleteComment);
router.get("/:tmdbId", authMiddleware.verifyToken, commentController.getCommentsByTmdbId);

export default router;