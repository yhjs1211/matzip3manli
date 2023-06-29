const express = require('express');
const app = express();

// router
const router = require('./router/index.js');

// config
const config = require('./config.js');

// cookie - parser
const cookieParser = require('cookie-parser');

// DB - mysql
const mysql = require('./database/db.js');
const models = require('./database/Models/index.js');

// request data middleware
app.use(express.json());
app.use(cookieParser());

// 만약 이미지가 없을 때 대체 이미지로 넣는 것
app.use(express.static('static'));

app.get('/', (req, res, next) => {
  res.status(200).render('index.html');
});

app.use('/', router);

(async () => {
  await mysql.sync().then(() => {
    app.listen(config.port, () => {
      console.log(`${config.port} is running..`);
    });
  });
})();
