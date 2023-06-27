const variable = {
    db : {
        host : '',
        username : '',
        password : '',
        database : ''
    },
    jwt : {
        secretKey : 'matzip-3manli',
        expireIn : '1d'
    },
    port : 3030,
    bcrypt :{
        salt : 10
    },
    
};

module.exports = variable;