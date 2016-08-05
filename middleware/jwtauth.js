let passport = require("passport");
let passportJWT = require("passport-jwt");
let User = require(__base + 'models/user');
let config = require(__base + 'config/database');
let errorBuilder = require(__base + 'services/error/builder');
let ExtractJwt = passportJWT.ExtractJwt;//extract jwt token
let Strategy = passportJWT.Strategy;//策略選擇為jwt
let params = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader() //creates a new extractor that looks for the JWT in the authorization header with the scheme 'JWT',e.g JWT + 'token'
};

module.exports = function() {
    let strategy = new Strategy(params, function(payload, done) {
        //驗證token是否失效
        if (payload.exp <= Date.now()) {
            return done(errorBuilder.unauthorized('Access token has expired'), false);
        }
        //根據解析後id取得user，並驗證user是否存在
        User.findOne({ _id: payload.iss }, function(err, user) {
            if (err) return done(err, false);
            if (user) done(null, user);
            else done(null, false);
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", { session: false });
        }
    };
};
