const jwt = require('jsonwebtoken');

async function isAuth(req, res, next) {
    req.user = {
        id: 1,
        postId: 2,
    };
    console.log(req.user, '아이디가 생성되었습니다');

    next();
}

module.exports = isAuth;
