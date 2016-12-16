'use strict';
let errorBuilder = require(__base + 'services/error/builder');
let initial_config = require(__base + 'config/initial'); // get initial config file
let User = require(__base + 'models/user.js'); // get the mongoose model
let Role = require(__base + 'models/role');

class PermissionValidator {
    constructor() {

    }

    currentUserOperation(loginUserId, userid) { //驗證使用者是否瀏覽、編輯自己的資訊，僅最高管理者不受此限
        return new Promise((resolve, reject) => {
            let dbErrorHandler = (error) => {
                reject(errorBuilder.internalServerError(error));
            }

            User.findOne({_id: userid}).then(user => {
                if (!user) reject(errorBuilder.notFound('resource not found'));
                Role.findOne({_id: user.roleId}).then(role => {
                    let isAdmin = role.level === initial_config.admin_role_level;
                    let isSelf = userid.toString() === loginUserId.toString();
                    if (isAdmin || isSelf) {
                        resolve({
                            user: user,
                            role: role,
                            isAdmin: isAdmin,
                            isSelf: isSelf
                        });
                    } else reject(errorBuilder.unauthorized('permission denied'));
                }).catch(dbErrorHandler);
            }).catch(dbErrorHandler);
        })
    }

    editRoleInRoles(roleId) {
        return new Promise((resolve, reject) => {
            Role.findOne({_id: roleId}).then(role => {
                if (!role) reject(errorBuilder.badRequest('roleId not exist'));
                else resolve(role);
            }).catch(error => {
                reject(errorBuilder.internalServerError(error));
            })
        })
    }
}

module.exports = PermissionValidator;
