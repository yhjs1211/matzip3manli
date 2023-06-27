const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');

const Comment = mysql.define('comment',{
    id:{
        type:Datatypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    comment:{
        type:Datatypes.TEXT,
        allowNull:false
    },
    nickname:{
        type:Datatypes.STRING,
        allowNull:false
    }
});

module.exports=Comment;