const jwt = require('jsonwebtoken');
const User = require('../database/Models/user.js');
const config = require('../config.js');

async function isAuth(req, res, next) {
  const auth = req.cookies.Authorization;
  console.log(typeof auth);
  if (!auth || !auth.startsWith('Bearer')) {
    return res.status(400).json({ message: '로그인 먼저 해주세요.' });
  }

  const token = auth.split(' ')[1];

  try {
    const payload = await jwt.verify(token, config.jwt.secretKey);
    if (payload) {
      const userId = payload.userId;
      const foundUser = await User.findByPk(userId);

      if (foundUser) {
        res.locals.foundUser = foundUser.dataValues;
        next();
      } else {
        res.status(404).json({
          errorMessage: '존재하지 않는 회원입니다.',
        });
      }
    } else {
      return res.status(400).json({ message: 'Token 이 올바르지 않습니다.' });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Error!' });
  }
}

module.exports = isAuth;
