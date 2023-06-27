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
    name:{
        type:Datatypes.STRING,
        allowNull:false
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
    email:{
        type:Datatypes.STRING,
        allowNull:false
    },
    imageURL:{
        type:Datatypes.STRING,
        allowNull:true
    },
    introduce:{
        type:Datatypes.TEXT,
        allowNull:true
    },
    phone:{
        type:Datatypes.INTEGER,
        allowNull:true
    }
});

User.hasMany(Post);
User.hasMany(Comment);

module.exports=User;