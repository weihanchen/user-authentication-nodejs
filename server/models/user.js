'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// set up a mongoose model
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    displayName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    const user = this;
    //密碼變更或新密碼時
    if (user.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            /* istanbul ignore if */
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                /* istanbul ignore if */
                if (err) {
                    return next(err);
                }
                //使用hash取代明文密碼
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/**
 * mongoose支持擴展方法，因此撰寫密碼驗證
 * @param  {[string]}   password [密碼]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
UserSchema.methods.comparePassword = function (candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        /* istanbul ignore if */
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
