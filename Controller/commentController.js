const jwt = require('jsonwebtoken');
const Comment = require('../database/Models/comment.js');
const config = require('../config.js');
const { secretKey, expireIn } = config.jwt;
const bcrypt = require('bcrypt');

module.exports = {
    getCommentsByPostId: async (req, res, next) => {
        const postId = req.params.postId;
        try {
            const comments = await Comment.findAll({
                where: {
                    postId,
                },
            });
            res.status(200).json(comments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '서버 에러' });
        }
    },

    getCommentsByUserId: async (req, res, next) => {
        const userId = req.params.userId;
        try {
            const comments = await Comment.findAll({
                where: {
                    userId,
                },
            });
            res.status(200).json(comments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '서버 에러' });
        }
    },

    create: async (req, res, next) => {
        const { comment } = req.body;
        const foundUser = res.locals.foundUser;
        const postId = req.params.postId; // postId 가져오기

        try {
            const newComment = await Comment.create({
                nickname: foundUser.nickname,
                comment,
                userId: foundUser.id, // userId 가져오기
                postId, // postId 추가
            });

            res.status(201).json(newComment.toJSON());
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '서버 에러' });
        }
    },

    update: async (req, res, next) => {
        const { comment } = req.body;
        const { commentId } = req.params;
        try {
            await Comment.update({ comment }, { where: { id: commentId } });

            res.status(200).json({ message: '댓글 수정 완료' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '서버 에러' });
        }
    },

    delete: async (req, res, next) => {
        const { commentId } = req.params;
        try {
            await Comment.destroy({ where: { id: commentId } });

            res.status(200).json({ message: '댓글 삭제 완료' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: '서버 에러' });
        }
    },
};
