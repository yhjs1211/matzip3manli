const variable = {
  db: {
    host: 'express-database.c6ilcmhwtewt.ap-northeast-2.rds.amazonaws.com',
    username: 'root',
    password: 'root1234',
    database: 'matZip',
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
