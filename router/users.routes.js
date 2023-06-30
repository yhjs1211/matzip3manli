const router = require('express').Router();

// middleware
const isAuth = require('../Middleware/auth.js');
const validator = require('../Middleware/validation.js');
const userController = require('../Controller/userController.js');

router.post('/signup', validator.createUser, userController.create);

router.post('/login', validator.loginUser, userController.login);

router.get('/logout', userController.logout);

router.post('/mail',validator.verifyEmail, userController.mail);

router.post('/:userId', validator.updateUser, userController.update);



module.exports = router;

 