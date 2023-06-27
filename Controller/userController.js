const jwt = require('jsonwebtoken');
const User = require('../database/Models/user.js');
const config = require('../config.js');
const {secretKey, expireIn} = config.jwt;
const bcrypt = require('bcrypt');

module.exports = {
    create : async (req, res, next) => {
        
    },
    login : async (req, res) => {
        
    },
    logout : (req, res) => {
        res.clearCookie('Authorization');
        res.redirect('/');
    },
    update : (req, res) => {
        
    }
};