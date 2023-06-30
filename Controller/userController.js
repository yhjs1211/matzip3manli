const jwt = require('jsonwebtoken');
const User = require('../database/Models/user.js');
const config = require('../config.js');
const { secretKey, expireIn } = config.jwt;
const bcrypt = require('bcrypt');
const validator = require('express-validator');
const mailsender = require('../mail/mail.js');

module.exports = {
  create: async (req, res, next) => {
    const { nickname, name, email, phone, imageURL, password } = req.body;
    const foundData = await User.findOne({ where: { nickname } });
    if (!foundData) {
      const hashedPassword = bcrypt.hashSync(password, config.bcrypt.salt);

      const created = await User.create({
        nickname,
        password: hashedPassword,
        name,
        email,
        phone,
        imageURL,
      }).then((d) => {
        return d;
      });

      return res.status(201).json(created.toJSON());
    } else {
      return res.status(400).json({
        Success: false,
        message: '이미 존재하는 닉네임 입니다.',
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const foundData = await User.findOne({ where: { email } });
      const match = bcrypt.compareSync(password, foundData.dataValues.password);

      if (match) {
        const token = await jwt.sign(
          {
            userId: foundData.dataValues.id,
          },
          secretKey,
          { expiresIn: expireIn }
        );
        res.cookie('Authorization', 'Bearer ' + token);
        res.status(200).json({
          token: token,
          message: '로그인 되었습니다.',
        });
      } else {
        res.status(400).json({
          message: '닉네임과 비밀번호가 일치하지 않습니다.',
        });
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: 'Bad Request',
      });
    }
  },
  logout: (req, res) => {
    res.clearCookie('Authorization');
    res.render(__dirname + '/index.html');
    res.end();
  },
  getUser: async (req, res) => {
    const user = res.locals.foundUser;
    
    res.status(200).json(JSON.parse(JSON.stringify(user)));
  },
  update: async (req, res) => {
    const id = req.params.userId;
    const { nickname, imageURL, introduce, phone } = req.body;

    if (!nickname && !imageURL && !introduce && !phone) {
      console.log(req.url);
      res.status(400).json({ message: '업데이트 할 정보를 입력해주세요.' });
    } else {
      try {
        const foundUser = await User.findByPk(id);
        if (foundUser) {
          // await User.update(,{where:id})
        } else {
          res.status(404).json({ message: '회원 정보를 찾을 수 없습니다.' });
        }
      } catch (e) {}
    }
  },
  mail: (req, res) => {
    const email = req.body.email;

    const verifyNum = mailsender.sendKakaoMail(email);

    res.status(200).json({
      verifyNum: `${verifyNum}`,
      message: '인증메일이 전송되었습니다.',
    });
  },
};
