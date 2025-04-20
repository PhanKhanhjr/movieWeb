import { commentService } from '../services/commentService.js';
import Comment from "../models/comment.js";
const createComment = async (req, res) => {
    const userId = req.user.id;
// userId từ token
    const { content } = req.body; // Nội dung comment từ body
    const tmdbId = req.params.tmdbId; // tmdbId từ URL

    try {
        const comment = await commentService.createComment({ userId, tmdbId, content });
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateComment = async (req, res) => {
    const { content } = req.body;
    const { tmdbId, commentId } = req.params;
    const userId = req.user.id; // userId từ token

    try {
        // Tìm comment theo commentId và tmdbId
        const comment = await Comment.findOne({ _id: commentId, tmdbId });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Kiểm tra xem người dùng có quyền sửa không
        if (comment.userId.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied: You cannot edit this comment' });
        }

        // Cập nhật nội dung comment
        comment.content = content;

        await comment.save(); // Lưu lại

        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteComment = async (req, res) => {
    const { tmdbId, commentId } = req.params;
    const userId = req.user.id;// userId từ token

    try {
        // Tìm comment theo commentId và tmdbId
        const comment = await Comment.findOne({ _id: commentId, tmdbId });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Kiểm tra xem người dùng có quyền xóa không
        if (comment.userId.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied: You cannot delete this comment' });
        }

        // Xóa comment
        await comment.deleteOne();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getCommentsByTmdbId = async (req, res) => {
    const { tmdbId } = req.params;
    try {
        const comments = await Comment.find({ tmdbId })
            .populate("userId", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





export default { createComment, updateComment,deleteComment, getCommentsByTmdbId };
