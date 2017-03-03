'use strict';
const initial_config = require(__base + 'config/initial'), // get initial config file
      errorBuilder = require(__base + 'services/error/builder'),
      User = require(__base + 'models/user'),
      Role = require(__base + 'models/role');

exports.initialize = (req, res, next) => {
    /* istanbul ignore next */
    const errorHandler = (error) => next(error);
    setRoles()
      .then(() => setAdminUser())
      .then(() => {
        res.json({
            success: true,
            message: 'Successful initialize.'
        });
      })
      .catch(errorHandler);
}

//private methods
function setAdminUser() {
    return new Promise((resolve, reject) => {
        /* istanbul ignore next */
        const dbErrorHandler = (error) => reject(errorBuilder.badRequest(error.errmsg));
        User.findOne({
            username: initial_config.admin_account
        }).then(user => {
            /* istanbul ignore if  */
            if (user) {
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
            /* istanbul ignore if  */
            if (count > 0) {
                resolve();
                return;
            }
            let roles = initial_config.roles;
            roles.forEach(role => {
                let promise = new Promise((roleResolve, roleReject) => {
                    let newRole = new Role(role);
                    newRole.save(error => {
                        /* istanbul ignore if  */
                        if (error) roleReject(errorBuilder.badRequest(error.errmsg));
                        else roleResolve();
                    });
                })
                promises.push(promise);
            })
        }).catch(error => {
            /* istanbul ignore next */
            reject(error);
        })

        Promise.all(promises).then(() => {
            resolve();
        }, error => {
            /* istanbul ignore next */
            reject(error);
        })
    })

}
