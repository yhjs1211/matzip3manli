const validator = require('express-validator');

const { cookie, query, param, body, validationResult } = validator;

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
        body('nickname').trim().isLength({ min: 1 }).withMessage('닉네임을 입력해주세요.'),
        body('name').trim().notEmpty().withMessage('이름을 입력해주세요.'),
        validate,
    ],
    loginUser: [],
    CommentUser: [
        body('comment').trim().isLength({ min: 3 }).withMessage('댓글은 최소 3글자 이상 작성 부탁드립니다.'),
        validate,
    ],
};

module.exports = defaultValidate;
