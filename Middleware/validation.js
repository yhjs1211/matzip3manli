const validator = require('express-validator');

const {query,param,body,validationResult} = validator;

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
        body('nickname').trim().isLength({min:1}).withMessage('닉네임을 입력해주세요.'),
        body('name').trim().notEmpty().withMessage('이름을 입력해주세요.'),
        body('email').trim().isEmail().withMessage('이메일 형식에 맞춰주세요.').normalizeEmail(),
        body('imageURL','URL 형식이 아닙니다.').notEmpty().isURL(),
        body('phone').notEmpty().isInt().withMessage("\'-\'를 뺀 숫자만 입력해주세요."),
        body('password').trim().custom((pw,m)=>{
            if(pw.includes(m.req.body.nickname)){
                return false;
            }else{
                return true;
            }
        }).withMessage('비밀번호 안에 닉네임을 포함할 수 없습니다.').equals(body('confirm').trim()).withMessage('확인 비밀번호와 다릅니다.').matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('숫자와 문자,특수기호 조합으로 8~15자리를 적어주세요.'),
        validate
    ],
    loginUser:[

        validate
    ],
    
};

module.exports=defaultValidate;