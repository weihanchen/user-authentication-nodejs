'use strict';
let errorBuilder = require(__base + 'services/error/builder');
let initial_config = require(__base + 'config/initial'); // get initial config file
let User = require(__base + 'models/user.js'); // get the mongoose model
let Role = require(__base + 'models/role');

class PermissionValidator {
    constructor() {

    }

    currentUserOperation(loginUserId, userid) { //驗證使用者是否編輯自己的資訊，僅最高管理者不受此限
        let deferred = Promise.defer();
        let dbErrorHandler = (error) => {
            deferred.reject(errorBuilder.internalServerError(error));
        }
        User.findById(userid).then(user => {
            Role.findById(user.roleId).then(role => {
                let isAdmin = role.level === initial_config.admin_role_level;
                let isSelf = userid.toString() === loginUserId.toString();
                if (isAdmin || isSelf) {
                    deferred.resolve({
                        user: user,
                        role: role,
                        isAdmin: isAdmin,
                        isSelf: isSelf
                    });
                } else deferred.reject(errorBuilder.unauthorized('permission denied'));
            }).catch(dbErrorHandler);
        }).catch(dbErrorHandler);

        return deferred.promise;
    }

    editRoleInRoles(roleId) {
        let deferred = Promise.defer();
        Role.findById(roleId).then(role => {
            if (!role) deferred.reject(errorBuilder.badRequest('roleId not exist'));
            else deferred.resolve(role);
        }).catch(error => {
            deferred.reject(errorBuilder.internalServerError(error));
        })
        return deferred.promise;
    }
}

module.exports = PermissionValidator;
