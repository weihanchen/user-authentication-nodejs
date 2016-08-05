'use strict';
let config = require(__base + 'config/database'); // get db config file
let errorBuilder = require(__base + 'services/error/builder');
let User = require(__base + 'models/user.js'); // get the mongoose model
let jwt = require('jwt-simple');
let moment = require('moment');
exports.login = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, (error, user) => {
        if (error) next(errorBuilder.badRequest(error));
        if (!user) next(errorBuilder.badRequest('User not found.'));
        else {
            user.comparePassword(req.body.password, (error, isMatch) => { //使用user schema中定義的comparePassword檢查請求密碼是否正確
                if (isMatch && !error) {
                    let expires = moment().add(1, 'day').valueOf();
                    let token = jwt.encode({
                        iss: user.id, //加密對象
                        exp: expires
                    }, config.secret);
                    res.json({ success: true, token: 'JWT ' + token }); //JWT for passport-jwt extract fromAuthHeader
                } else {
                    next(errorBuilder.badRequest('Wrong password.'));
                }
            })
        }
    })
}
exports.me = (req, res, next) => { //get users/me之前經過中間件驗證用戶權限，當驗證通過便取得正確用戶訊息，直接回傳即可
    let responseBody = {
        username: req.user.username,
        displayName: req.user.displayName
    }
    res.send(responseBody);
}
exports.signup = (req, res, next) => {
    let requireProperties = ['displayName', 'password', 'username'];
    let propertyMissingMsg = '';
    let requireValid = requireProperties.every(property => {
        if (!req.body.hasOwnProperty(property)) {
            propertyMissingMsg = 'Please pass ' + property;
            return false;
        }
        return true;
    })
    if (!requireValid) {
        next(errorBuilder.badRequest(propertyMissingMsg));
        return;
    }
    if (!req.body.username || !req.body.password) next(errorBuilder.badRequest('Please pass username and password'))
    else {
        let newUser = new User({
            username: req.body.username,
            displayName: req.body.displayName,
            password: req.body.password
        })
        User.findOne({ username: newUser.username }, (error, user) => {
            if (error) next(errorBuilder.internalServerError());
            else if (user) {
                next(errorBuilder.badRequest('username already exist.'));
            } else {
                newUser.save((error) => {
                    if (error) next(errorBuilder.internalServerError());
                    else res.json({ success: true, message: 'Successful signup.' });
                })
            }

        })

    }
}
