const router = require('express').Router();
const Post = require('../database/Models/post');
const defaultValidate = require('../Middleware/validation');
const postController = require('../Controller/postController');
const isAuth = require('../Middleware/auth');

// 게시글 작성
router.post('/', isAuth, defaultValidate.createPost, postController.create);

//게시글 지역별 조회
router.get('/zone', postController.getPostsByZone);

// 게시글 전체 조회(좋아요순, 최신생성순)
router.post('/list', postController.getPosts);

router.put('/like',isAuth,postController.like)

// 게시글 상세 조회
router.get('/:id', postController.getPost);

// 게시글 수정
router.put('/:id', isAuth, defaultValidate.updatePost, postController.update);

// 게시글 삭제
router.delete('/:id', isAuth, postController.delete);

module.exports = router;
