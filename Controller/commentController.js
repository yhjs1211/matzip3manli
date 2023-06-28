const jwt = require('jsonwebtoken');
const Comment = require('../database/Models/comment.js');
const config = require('../config.js');
const { secretKey, expireIn } = config.jwt;
const bcrypt = require('bcrypt');

module.exports = {
    //특정 게시물 댓글 조회
    getCommentsByPostId: async (req, res, next) => {
        const { postId } = req.params;
        try {
            const comments = await Comment.findAll({
                where: {
                    postId,
                },
            });
            res.status(200).json(comments);
        } catch (err) {
            console.error(err);
        }
    },
    //특정 사용자 작성 댓글을 조회
    getCommentsByUserId: async (req, res, next) => {
        const { userId } = req.params;
        try {
            const comments = await Comment.findAll({
                where: {
                    userId,
                },
            });
            res.status(200).json(comments);
        } catch (err) {
            console.error(err);
        }
    },

    //댓글 생성
    create: async (req, res, next) => {
        //댓글 작성에 필요한값만 가져오기 위해 postId와 comment 값을 가져온다.
        const { comment, nickname } = req.body;
        //req.user으로 현재 로그인 사용자 정보에 접근해서 id를 가져옴
        const { id, postId } = req.user;

        try {
            const newComment = await Comment.create({
                nickname,
                comment,
                userId: id,
                postId,
            }).then((v) => {
                return v;
            });
            res.status(201).json(newComment.toJSON());
        } catch (err) {
            console.error(err);
        }
    },

    //댓글 수정
    update: async (req, res, next) => {
        const { comment } = req.body;
        const { commentId } = req.params;
        try {
            await Comment.update({ comment }, { where: { id: commentId } });

            res.status(200).json({ message: '댓글 수정 완료' });
        } catch (err) {
            console.error(err);
        }
    },

    //댓글 삭제
    delete: async (req, res, next) => {
        const { commentId } = req.params;
        try {
            await Comment.destroy({ where: { id: commentId } });

            res.status(200).json({ message: '댓글 삭제 완료' });
        } catch (err) {
            console.error(err);
        }
    },
};
