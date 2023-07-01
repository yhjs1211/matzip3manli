const variable = {
  db: {
    host: 'express-database.cjx2t84z9jyl.ap-northeast-2.rds.amazonaws.com',
    username: 'root',
    password: '20211211',
    database: 'matzip',
  },
  jwt: {
    secretKey: 'matzip-3manli',
    expireIn: '1d',
  },
  port: 3030,
  bcrypt: {
    salt: 10,
  },
};

module.exports = variable;
