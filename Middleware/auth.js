const jwt = require('jsonwebtoken');

async function isAuth(req,res,next){
    next();
}

module.exports=isAuth;