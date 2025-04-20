import Comment from '../models/comment.js';

const createComment = async ({ userId, tmdbId, content }) => {
    if (!tmdbId || !content) {
        throw new Error('Thiếu tmdbId hoặc nội dung comment');
    }

    const newComment = new Comment({
        userId,
        tmdbId,
        content,
    });

    return await newComment.save();
};

const getCommentById = async (commentId) => {
    return await Comment.findById(commentId); // Tìm comment theo ID
};
// Sau này thêm deleteComment, updateComment, getCommentsByTmdbId, ...

export const commentService = {
    createComment,
    getCommentById,
    // deleteComment,
    // updateComment,
    // getCommentsByTmdbId,
    // getUserComments,
};
