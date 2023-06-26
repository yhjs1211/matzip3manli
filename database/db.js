const Sq = require('sequelize');

const config = require('../config.js');

const {database, host, password, username} = config.db;

const mysql = new Sq.Sequelize(database,username,password,{
    host : host,
    dialect : 'mysql'
});

// const {Model} = Sq;

// class User extends Model{
    
// };

// User.init({},{Sq});

module.exports = mysql;