const jwt = require('jsonwebtoken');
const Comment = require('../database/Models/comment.js');
const config = require('../config.js');
const {secretKey, expireIn} = config.jwt;
const bcrypt = require('bcrypt');

module.exports={
    getCommentsByPostId : async (req, res, next) => {
        
    },
    getCommentsByUserId : async (req, res, next) => {
        
    },
    create : async (req, res, next) => {
        
    }
    ,
    update : async (req, res, next) => {
        
    },
    delete : async (req, res, next) => {
        
    }
};