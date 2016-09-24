'use strict';
let initial_config = require(__base + 'config/initial'); // get initial config file
let errorBuilder = require(__base + 'services/error/builder');
// get the mongoose model
let User = require(__base + 'models/user');
let Role = require(__base + 'models/role');

exports.initialize = (req, res, next) => {
    let errorHandler = (error) => {
        next(error);
    }
    setRoles().then(() => {
        setAdminUser().then(() => {
            res.json({
                success: true,
                message: 'Successful initialize.'
            })
        }, errorHandler)
    }, errorHandler)
}

//private methods
function setAdminUser() {
    let deferred = Promise.defer();
    let dbErrorHandler = (error) => {
        deferred.reject(errorBuilder.badRequest(err.errmsg));
    }
    User.findOne({ username: initial_config.admin_account }).then(user => {
        if (user) { //has initialized
            deferred.resolve();
            return;
        }
        Role.findOne({ level: initial_config.user_role_level }).then(role => {
            let adminUser = new User({
                displayName: initial_config.admin_account,
                username: initial_config.admin_account,
                password: initial_config.admin_password,
                roleId: role._id
            })
            adminUser.save().then(() => {
                deferred.resolve();
            }).catch(dbErrorHandler);
        }).catch(dbErrorHandler);
    }).catch(dbErrorHandler);


    return deferred.promise;
}

function setRoles() {
    let promises = [];
    let result = Promise.defer();
    Role.count().then(count => {
        if (count <= 0) {
            deferred.resolve();
            return;
        }
        let roles = initial_config.roles;
        roles.forEach(role => {
            let deferred = Promise.defer();
            let newRole = new Role(role);
            newRole.save(error => {
                if (error) deferred.reject(errorBuilder.badRequest(error.errmsg));
                else deferred.resolve();
            });
            promises.push(deferred.promise);
        })
    },error=>{
        deferred.reject(error);
    })

    Promise.all(promises).then(() => {
        result.resolve();
    }, error => {
        result.reject(error);
    })
    return result.promise;
}
