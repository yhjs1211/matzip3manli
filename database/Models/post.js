const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');
const Comment = require('./comment.js');

const Post = mysql.define('post', {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    // nickname:{
    //     type:Datatypes.STRING,
    //     allowNull:false
    // },
    restaurantName: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    zone: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    menu: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    content: {
        type: Datatypes.TEXT,
        allowNull: false,
    },
    like: {
        type: Datatypes.INTEGER,
        defaultValue: 0,
    },
    foodImgURL: {
        type: Datatypes.STRING,
        allowNull: true,
    },
});

Post.hasMany(Comment);

module.exports = Post;
