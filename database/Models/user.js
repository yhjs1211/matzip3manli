const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');
const Post = require('./post.js');
const Comment = require('./comment.js');

const User = mysql.define('user',{
    id:{
        type:Datatypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nickname:{
        type:Datatypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Datatypes.STRING,
        allowNull:false
    },
    phone:{
        type:Datatypes.INTEGER,
        allowNull:false
    },
    imageURL:{
        type:Datatypes.STRING,
        allowNull:true
    },
    email:{
        type:Datatypes.STRING,
        allowNull:true
    },
    introduce:{
        type:Datatypes.TEXT,
        allowNull:true
    }
});

User.hasMany(Post);
User.hasMany(Comment);

module.exports=User;