let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
// load up the user model
let User = require(__base + 'models/user');
let config = require(__base + 'config/database'); // get db config file
module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret; //取得密鑰
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
