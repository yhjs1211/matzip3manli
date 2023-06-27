const jwt = require('jsonwebtoken');
const Post = require('../database/Models/post.js');
const config = require('../config.js');
const { secretKey, expireIn } = config.jwt;
const bcrypt = require('bcrypt');

module.exports = {
  create: async (req, res, next) => {
    const { restaurantName, zone, menu, content, like, foodImgURL } = req.body;
    await Post.create({
      restaurantName,
      zone,
      menu,
      content,
      like,
      foodImgURL,
    });
    res.status(200).json({ messeage: '게시글 업로드 성공!' });
  },
  getPostsByZone: async (req, res, next) => {},
  getPosts: async (req, res, next) => {},
  getPost: async (req, res, next) => {},
  update: async (req, res, next) => {},
  delete: async (req, res, next) => {},
};
