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
    return new Promise((resolve, reject) => {
        let dbErrorHandler = (error) => {
            reject(errorBuilder.badRequest(error.errmsg));
        }
        User.findOne({
            username: initial_config.admin_account
        }).then(user => {
            if (user) { //has initialized
                resolve();
                return;
            }

            Role.findOne({
                level: initial_config.admin_role_level
            }).then(role => {
                let adminUser = new User({
                    displayName: initial_config.admin_account,
                    username: initial_config.admin_account,
                    password: initial_config.admin_password,
                    roleId: role._id
                })
                adminUser.save().then(() => {
                    resolve();
                }).catch(dbErrorHandler);
            }).catch(dbErrorHandler);
        }).catch(dbErrorHandler);
    })
}

function setRoles() {
    return new Promise((resolve, reject) => {
        let promises = [];
        Role.count().then(count => {
            if (count > 0) {
                resolve();
                return;
            }
            let roles = initial_config.roles;
            roles.forEach(role => {
                let promise = new Promise((roleResolve, roleReject) => {
                    let newRole = new Role(role);
                    newRole.save(error => {
                        if (error) roleReject(errorBuilder.badRequest(error.errmsg));
                        else roleResolve();
                    });
                })
                promises.push(promise);
            })
        }).catch(error => {
            reject(error);
        })

        Promise.all(promises).then(() => {
            resolve();
        }, error => {
            reject(error);
        })
    })

}