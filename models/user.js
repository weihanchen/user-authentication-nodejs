let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

// set up a mongoose model
let UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', (next) =>{
    let user = this;
    //產生hash當密碼變更或新密碼時
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) =>{
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, (err, hash) =>{
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
UserSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
