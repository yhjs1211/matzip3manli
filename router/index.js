const router = require('express').Router();
const commentsRouter = require('./comments.routes.js');
const postsRouter = require('./posts.routes.js');
const usersRouter = require('./users.routes.js');

const defalutRouter = [
    {
        path : '/posts',
        route : postsRouter
    },
    {
        path : '/comments',
        route : commentsRouter
    },
    {
        path : '/users',
        route : usersRouter
    },
];

defalutRouter.forEach(r=>{
    router.use(r.path,r.route);
});

module.exports=router;