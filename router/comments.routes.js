const router = require('express').Router();
const commentController = require('../controller/commentController.js');
const validation = require('../middleware/validation.js');
const isAuth = require('../middleware/auth');

//게시물 댓글 조회
router.get('/:postId', commentController.getCommentsByPostId);
//사용자 댓글 조회
router.get('/:userId', commentController.getCommentsByUserId);
//댓글을 작성하고 수정하는 파트에만 미들웨어 검증
router.post('/:postId', isAuth, validation.CommentUser, commentController.create);
router.put('/:commentId', validation.CommentUser, commentController.update);
router.delete('/:commentId', commentController.delete);

module.exports = router;
