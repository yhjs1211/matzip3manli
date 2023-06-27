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
        body('nickname').trim().isLength({min:1}).withMessage('닉네임을 입력해주세요.'),
        body('name').trim().notEmpty().withMessage('이름을 입력해주세요.'),
        validate
    ],
    loginUser:[

    ],
    
};

module.exports=defaultValidate;