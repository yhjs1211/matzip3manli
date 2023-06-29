const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');

const Comment = mysql.define('comment', {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    //댓글 작성 사용자 식별ID
    userId: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    //댓글 게시물 식별ID
    postId: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: Datatypes.TEXT,
        allowNull: false,
    },
    nickname: {
        type: Datatypes.STRING,
        allowNull: false,
    },
});

module.exports = Comment;
