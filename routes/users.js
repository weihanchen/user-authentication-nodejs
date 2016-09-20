'use strict';
let config = require(__base + 'config/database'); // get db config file
let errorBuilder = require(__base + 'services/error/builder');
let initial_config = require(__base + 'config/initial'); // get initial config file
let User = require(__base + 'models/user.js'); // get the mongoose model
let Role = require(__base + 'models/role');
let jwt = require('jwt-simple');
let moment = require('moment');
exports.delete = (req, res, next) => {
    let userid = req.params.id;
    User.findByIdAndRemove(userid).exec().then(user => {
        if (!user) next(errorBuilder.notFound('resource not found'));
        else res.json({ success: true, uid: user._id });
    }).catch(error => {
        next(errorBuilder.badRequest(error));
    })
}
exports.info = (req, res, next) => {
    let userid = req.params.id;
    let loginUserId = req.user._id;
    let dbErrorHandler = (error) =>{
         next(errorBuilder.internalServerError(error));
    }
    User.findById(userid).then(user=>{
        Role.findById(user.roleId).then(role=>{
            if (role.level != initial_config.admin_role_level || userid != loginUserId) next(errorBuilder.unauthorized('permission denied'));
            else {
                res.json({
                    _id: user._id,
                    username: user.username,
                    displayName: user.displayName,
                    role: role.role
                })
            }
        }).catch(dbErrorHandler);
    }).catch(dbErrorHandler);
}
exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username }).exec().then(user => {
        if (!user) next(errorBuilder.badRequest('User not found.'));
        else {
            user.comparePassword(req.body.password, (error, isMatch) => { //使用user schema中定義的comparePassword檢查請求密碼是否正確
                if (isMatch && !error) {
                    let expires = moment().add(1, 'day').valueOf();
                    let token = jwt.encode({
                        iss: user.id, //加密對象
                        exp: expires
                    }, config.secret);
                    res.json({ success: true, uid: user.id, token: 'JWT ' + token }); //JWT for passport-jwt extract fromAuthHeader
                } else {
                    next(errorBuilder.badRequest('Wrong password.'));
                }
            })
        }
    }).catch(error => {
        next(errorBuilder.badRequest(error));
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
    let dbErrorHandler = (error) => {
        next(errorBuilder.internalServerError(error));
    }

    Role.findOne({ $query: {}, $orderby: { level: 1 } }).exec().then(role => { //get min level role to set signup user
        let newUser = new User({
            username: req.body.username,
            displayName: req.body.displayName,
            password: req.body.password,
            roleId: role._id
        })
        User.findOne({ username: newUser.username }).exec().then((user) => {
            if (user) next(errorBuilder.badRequest('username already exist.'));
            else {
                newUser.save().then(() => {
                    res.json({ success: true, message: 'Successful signup.' });
                }).catch(dbErrorHandler);
            }
        }).catch(dbErrorHandler)
    })


}
