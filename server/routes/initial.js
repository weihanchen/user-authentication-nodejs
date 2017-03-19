'use strict';
const initial_config = require(__base + 'config/initial'), // get initial config file
    errorBuilder = require(__base + 'services/error/builder'),
    User = require(__base + 'models/user'),
    Role = require(__base + 'models/role');

exports.initialize = (req, res, next) => {
    /* istanbul ignore next */
    const errorHandler = (error) => {
        next(error);
    };
    _setRoles()
        .then(() => _setAdminUser())
        .then(() => res.json({
            success: true,
            message: 'Successful initialize.'
        }))
        .catch(errorHandler);
};

//private methods
const _dbErrorHandler = (error) => Promise.reject(errorBuilder.badRequest(error.errmsg));
const _insertAdminUser = () => Role.findOne({ level: initial_config.admin_role_level })
    .then(role => {
        const adminUser = new User({
            displayName: initial_config.admin_account,
            username: initial_config.admin_account,
            password: initial_config.admin_password,
            roleId: role._id
        });
        return adminUser.save();
    });
const _insertRoles = () => {
    const promises = [],
        roles = initial_config.roles;
    roles.forEach(role => {
        const newRole = new Role(role);
        promises.push(newRole.save());
    });
    return Promise.all(promises)
        .catch(error => Promise.reject(errorBuilder.badRequest(error.errmsg)));
};
const _setAdminUser = () => User.findOne({ username: initial_config.admin_account })
    .then(user => {
        if (user) {
            return Promise.resolve();
        } else {
            return _insertAdminUser();
        }
    })
    .catch(_dbErrorHandler);

const _setRoles = () => Role.count()
    .then(count => {
        if (count > 0) {
            return Promise.resolve();
        } else {
            return _insertRoles();
        }
    });
