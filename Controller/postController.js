const jwt = require('jsonwebtoken');
const Post = require('../database/Models/post.js');
const User = require('../database/Models/user.js');
const config = require('../config.js');

module.exports = {
  create: async (req, res, next) => {
    const foundUser = res.locals.foundUser; // 해당하는 User의 모든 데이터
    console.log(foundUser);
    const { restaurantName, zone, menu, content, foodImgURL } = req.body;
    await Post.create({
      restaurantName,
      userId: foundUser.id,
      nickname: foundUser.nickname,
      zone,
      menu,
      content,
      foodImgURL,
    });
    res.status(200).json({ messeage: '게시글 업로드 성공!' });
  },
  getPostsByZone: async (req, res, next) => {
    const { zone } = req.query;
    try {
      const postsZone = await Post.findAll({
        attributes: ['restaurantName', 'like', 'menu', 'createdAt'],
        where: { zone },
      });
      res.status(200).json(postsZone);
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: '데이터를 찾을 수 없습니다.' });
    }
  },
  getPosts: async (req, res, next) => {
    const descType = req.body.descType;
    try {
      if (descType === 'like' || descType === undefined) {
        const posts = await Post.findAll({
          order: [['like', 'DESC']], // 좋아요순 정렬
        });
        return res.status(200).json({ data: posts });
      }
      if (descType === 'createdAt') {
        const posts = await Post.findAll({
          attributes: ['id', 'restaurantName', 'like', 'menu', 'createdAt'],
          order: [['createdAt', 'DESC']], // 생성순 정렬
        });
        return res.status(200).json({ data: posts });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  },
  getPost: async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await Post.findOne({
        attributes: [
          'id',
          'restaurantName',
          'nickname',
          'zone',
          'menu',
          'content',
          'like',
          'foodImgURL',
          'createdAt',
          'updatedAt',
        ],
        where: { id },
      });
      return res.status(200).json({ data: post });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errorMessage: '게시글 상세 조회에 실패하였습니다.' });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const foundUser = res.locals.foundUser;
    const { content } = req.body;
    const foundPost = await Post.findOne({ where: { id } });

    try {
      if (foundUser.id !== foundPost.userId) {
        return res.status(401).json({ Message: '수정할 권한이 없습니다.' });
      }
      await Post.update(
        { content },
        {
          where: { id },
        }
      );
      return res.status(200).json({ message: '게시글을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    const foundUser = res.locals.foundUser;
    const foundPost = await Post.findOne({ where: { id } });
    try {
      if (foundUser.id !== foundPost.userId) {
        return res.status(401).json({ Message: '삭제할 권한이 없습니다.' });
      }
      await Post.destroy({
        where: { id },
      });
      res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
  },
};
