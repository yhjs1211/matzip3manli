const validator = require('express-validator');

const { cookie, query, param, body, validationResult } = validator;

const validate = function (req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({
      errorMessage: errors.array().map((v, idx) => `${idx + 1} : ${v.msg}`),
    });
  }
};

const defaultValidate = {
  createUser: [
    body('nickname')
      .trim()
      .isLength({ min: 1 })
      .withMessage('닉네임을 입력해주세요.'),
    body('name').trim().notEmpty().withMessage('이름을 입력해주세요.'),
    validate,
  ],
  loginUser: [],
  createPost: [
    body('restaurantName')
      .trim()
      .notEmpty()
      .withMessage('식당 이름을 입력해주세요.'),
    body('zone').trim().notEmpty().withMessage('지역을 설정해주세요.'),
    body('menu')
      .trim()
      .notEmpty()
      .withMessage('메뉴를 한 가지 이상 입력해주세요.'),
    body('content')
      .trim()
      .notEmpty()
      .withMessage('내용을 입력해주세요.')
      .isLength({ min: 10 })
      .withMessage('10자 이상을 입력하셔야 합니다.'),
    body('foodImgURL').trim().isURL().withMessage('이미지 URL을 입력해주세요.'),
    validate,
  ],
};

module.exports = defaultValidate;
