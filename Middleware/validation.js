const validator = require('express-validator');

const { body, validationResult } = validator;

//단일 요청에 유효성 검사
const validate = function (req, res, next) {
  //req 객체들을 검증하고 오류인걸 errors 변수로 할당
  const errors = validationResult(req);
  //만약 오류가 없다면 다음 미들웨어로 전달
  if (errors.isEmpty()) {
    next();
  }
  //오류가 있다면 400 코드를 설정하고 json(메시지를 생성)
  else {
    res.status(400).json({
      //에러 메세지는 errors배열을 순회하며 오류 메시지를 생성.
      errorMessage: errors.array().map((v, idx) => `${idx + 1} : ${v.msg}`),
    });
  }
};

//라우터 유효성 검사
const defaultValidate = {
  createUser: [
    body('nickname').trim().notEmpty().withMessage('닉네임을 입력해주세요.'),
    body('name').trim().notEmpty().withMessage('이름을 입력해주세요.'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('이메일 형식이 아닙니다. 확인해주세요.'),
    body('password')
      .custom((value, { req }) => {
        if (value != req.body.confirm) {
          throw new Error('확인 비밀번호와 일치하지 않습니다.');
        } else {
          return value;
        }
      })
      .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/)
      .withMessage(
        '숫자와 문자, 기호를 포함한 8~15자리 비밀번호를 입력해주세요.'
      ),
    body('imageURL', 'URL 형식이 아닙니다. 확인해주세요.').isURL(),
    body('introduce').optional({ nullable: true, checkFalsy: true }),
    body('phone')
      .not()
      .contains('-')
      .withMessage("'-'를 빼고 입력해주세요.")
      .isLength({ min: 10, max: 11 })
      .withMessage('핸드폰 번호를 확인해주세요.')
      .optional({ nullable: true, checkFalsy: true }),
    validate,
  ],
  loginUser: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('이메일 형식이 아닙니다. 확인해주세요.'),
    body('password')
      .trim()
      .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/)
      .withMessage(
        '숫자와 문자, 기호를 포함한 8~15자리 비밀번호를 입력해주세요.'
      ),
    validate,
  ],
  updateUser: [
    body('nickname')
      .trim()
      .notEmpty()
      .withMessage('닉네임을 입력해주세요.')
      .optional({ nullable: true, checkFalsy: true }),
    body('imageURL', 'URL 형식이 아닙니다. 확인해주세요.')
      .isURL()
      .optional({ nullable: true, checkFalsy: true }),
    body('introduce').optional({ nullable: true, checkFalsy: true }),
    body('phone')
      .contains('-')
      .withMessage("'-'를 빼고 입력해주세요.")
      .optional({ nullable: true, checkFalsy: true }),
    validate,
  ],
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
  updatePost: [
    body('content')
      .trim()
      .notEmpty()
      .withMessage('수정할 내용을 입력해주세요.')
      .isLength({ min: 10 })
      .withMessage('수정할 내용은 10자 이상을 입력하셔야 합니다.'),
    validate,
  ],
  CommentUser: [
    body('comment')
      .trim()
      .isLength({ min: 3 })
      .withMessage('댓글은 최소 3글자 이상 작성 부탁드립니다.'),
    validate,
  ],
  verifyEmail: [
    body('email', '유효한 E-mail 주소를 입력해주세요.')
      .isEmail()
      .normalizeEmail(),
    validate,
  ],
};

module.exports = defaultValidate;
