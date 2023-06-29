const router = require('express').Router();
const Post = require('../database/Models/post');
const defaultValidate = require('../Middleware/validation');
const postController = require('../Controller/postController');

// 게시글 작성
router.post('/', defaultValidate.createPost, postController.create);

//게시글 지역별 조회
router.get('/zone', postController.getPostsByZone);

// 게시글 조회
router.get('/', postController.getPosts);

// 게시글 상세 조회
router.get('/:id', postController.getPost);

// 게시글 수정
router.put('/:id', postController.update);

// 게시글 삭제
router.delete('/:id', postController.delete);

module.exports = router;
