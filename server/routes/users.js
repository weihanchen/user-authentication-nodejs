'use strict';
const config = require(__base + 'config/database'); // get db config file
const errorBuilder = require(__base + 'services/error/builder');
const initial_config = require(__base + 'config/initial'); // get initial config file
const jwt = require('jwt-simple');
const moment = require('moment');
const PermissionValidator = require(__base + 'services/permissions/validator');
const permissionValidator = new PermissionValidator();
const User = require(__base + 'models/user'); // get the mongoose model
const Role = require(__base + 'models/role');
const ExpireToken = require(__base + 'models/expireToken');

/**
 * super admin 不能刪除自己帳號,待優化id不存在
 */
exports.delete = (req, res, next) => {
    const userid = req.params.id;
    const loginUserId = req.user.uid;
    const errorHandler = (error) => next(error);
    permissionValidator.currentUserOperation(loginUserId, userid).then((result) => {
        if (result.isAdmin && result.isSelf) errorHandler(errorBuilder.badRequest('admin cannot remove self\'s account'))
        else {
            result.user.remove().then(() => {
                res.json({
                    success: true,
                    uid: result.user._id
                });
            }).catch(errorHandler);
        }
    }).catch(errorHandler);
};

/**
 * 業務邏輯
 * 系統管理者不可更動自己的role但可以更動他人
 * 一般使用者不可更動role
 */
exports.edit = (req, res, next) => {
    const userid = req.params.id;
    const errorHandler = (error) => {
        next(error);
    };
    const updateUser = (user) => {
        Object.assign(user, req.body);
        user.save().then(() => {
            res.json({
                uid: user.id,
                username: user.username,
                displayName: user.displayName
            });
        }).catch(errorHandler);
    };
    permissionValidator.currentUserOperation(req.user.uid, userid).then((result) => {
        if (req.body.hasOwnProperty('roleId')) {
            permissionValidator.editRoleInRoles(req.body.roleId).then(() => {
                if (result.isSelf) errorHandler(errorBuilder.badRequest('cannot update role'));
                else if (result.isAdmin) {
                    updateUser(result.user);
                }

            }).catch(errorHandler);
        } else {
            updateUser(result.user);
        }
    }).catch(errorHandler);
};

exports.info = (req, res, next) => {
    const userid = req.params.id;
    const loginUserId = req.user.uid;
    permissionValidator.currentUserOperation(loginUserId, userid).then((result) => {
        res.json({
            uid: result.user._id,
            username: result.user.username,
            displayName: result.user.displayName,
            role: result.role.role
        });
    }).catch(error => {
      next(error);
    });
};

exports.login = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec().then(user => {
        if (!user) next(errorBuilder.badRequest('User not found.'));
        else {
            user.comparePassword(req.body.password, (error, isMatch) => { //使用user schema中定義的comparePassword檢查請求密碼是否正確
                if (isMatch && !error) {
                    const expires = moment().add(1, 'days').valueOf();
                    const token = jwt.encode({
                        iss: user.id, //加密對象
                        exp: expires
                    }, config.secret);
                    res.json({
                        success: true,
                        uid: user.id,
                        token: 'JWT ' + token
                    }); //JWT for passport-jwt extract fromAuthHeader
                } else {
                    next(errorBuilder.badRequest('Wrong password.'));
                }
            });
        }
    }).catch(error => {
        next(errorBuilder.badRequest(error));
    });
};

exports.logout = (req, res, next) => {
    const token = req.headers.authorization;
    const user = req.user;
    const expireToken = new ExpireToken({
        token: token,
        expireAt: user.expireAt
    });
    const promise = expireToken.save();
    promise.then(() => {
        res.json({
            success: true,
            message: 'Successful Logout.'
        });
    }).catch(error => {
        next(errorBuilder.internalServerError(error));
    });
};

exports.me = (req, res, next) => { //get users/me之前經過中間件驗證用戶權限
    User.findOne({
            _id: req.user.uid
        }).then(user => Role.findById(user.roleId).then(role => {
                return {
                    role: role,
                    user: user
                };
            })).then(result => {
            const responseBody = {
                uid: result.user.id,
                username: result.user.username,
                displayName: result.user.displayName,
                role: result.role.role
            };
            res.send(responseBody);
        })
        .catch(error => {
            next(errorBuilder.internalServerError(error))
        });
};

exports.signup = (req, res, next) => {
    const requireProperties = ['displayName', 'password', 'username'];
    let propertyMissingMsg = '';
    const requireValid = requireProperties.every(property => {
        if (!req.body.hasOwnProperty(property)) {
            propertyMissingMsg = 'Please pass ' + property;
            return false;
        }
        return true;
    });
    if (!requireValid) {
        next(errorBuilder.badRequest(propertyMissingMsg));
        return;
    }
    const dbErrorHandler = (error) => next(errorBuilder.internalServerError(error));

    Role.findOne({
        level: initial_config.user_role_level
    }).then(role => { //get min level role to set signup user
        if (!role) {
            next(errorBuilder.badRequest('please post /api/initialize'));
            return;
        }
        const newUser = new User({
            username: req.body.username,
            displayName: req.body.displayName,
            password: req.body.password,
            roleId: role._id
        });
        User.findOne({
            username: newUser.username
        }).exec().then((user) => {
            if (user) next(errorBuilder.badRequest('username already exist.'));
            else {
                newUser.save().then(() => {
                    res.json({
                        success: true,
                        message: 'Successful signup.'
                    });
                }).catch(dbErrorHandler);
            }
        }).catch(dbErrorHandler);
    });
};
