const router = require('express').Router();
const isAuth = require('../Middleware/auth.js');
const commentController = require('../controller/commentController.js');
const validation = require('../Middleware/validation.js');


//게시물 댓글 조회
router.get('/:postId', isAuth, commentController.getCommentsByPostId);
//사용자 댓글 조회
router.get('/:userId', isAuth, commentController.getCommentsByUserId);
//댓글을 작성하고 수정하는 파트에만 미들웨어 검증
router.post('/:postId', isAuth, validation.CommentUser, commentController.create);
router.put('/:commentId', isAuth, validation.CommentUser, commentController.update);
router.delete('/:commentId', isAuth, commentController.delete);

module.exports = router;
