const validator = require('express-validator');

const {cookie,query,param,body,validationResult} = validator;

const validate = function(req,res,next){
    const errors = validationResult(req);
    if(errors.isEmpty()){
        next();
    }else{
        res.status(400).json({
            errorMessage:errors.array().map((v,idx)=>`${idx+1} : ${v.msg}`)
        });
    }
};

const defaultValidate = {
    createUser:[
        body('nickname')
        .trim()
        .notEmpty()
        .withMessage('닉네임을 입력해주세요.'),
        body('name')
        .trim()
        .notEmpty()
        .withMessage('이름을 입력해주세요.'),
        body('email')
        .isEmail().normalizeEmail().withMessage('이메일 형식이 아닙니다. 확인해주세요.'),
        body('password')
        .custom((value,{req})=>{
            if(value!=req.body.confirm){
                throw new Error('확인 비밀번호와 일치하지 않습니다.');
            }else{
                return value;
            }
        })
        .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('숫자와 문자, 기호를 포함한 8~15자리 비밀번호를 입력해주세요.'),
        body('imageURL','URL 형식이 아닙니다. 확인해주세요.').isURL(),
        body('introduce')
        .optional({nullable:true, checkFalsy:true}),
        body('phone')
        .not().contains('-').withMessage('\'-\'를 빼고 입력해주세요.')
        .isLength({min:10,max:11}).withMessage('핸드폰 번호를 확인해주세요.')
        .optional({nullable:true, checkFalsy:true}),
        validate
    ],
    loginUser:[
        body('email')
        .isEmail().normalizeEmail().withMessage('이메일 형식이 아닙니다. 확인해주세요.'),
        body('password')
        .trim()
        .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('숫자와 문자, 기호를 포함한 8~15자리 비밀번호를 입력해주세요.'),
        validate
    ],
    updateUser:[
        body('nickname')
        .trim()
        .notEmpty()
        .withMessage('닉네임을 입력해주세요.')
        .optional({nullable:true, checkFalsy:true}),
        body('imageURL','URL 형식이 아닙니다. 확인해주세요.').isURL()
        .optional({nullable:true, checkFalsy:true}),
        body('introduce')
        .optional({nullable:true, checkFalsy:true}),
        body('phone')
        .contains('-')
        .withMessage('\'-\'를 빼고 입력해주세요.')
        .optional({nullable:true, checkFalsy:true}),
        validate
    ]
};

module.exports=defaultValidate;