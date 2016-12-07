let passport = require("passport");
let passportJWT = require("passport-jwt");
let config = require(__base + 'config/database');
let errorBuilder = require(__base + 'services/error/builder');
let ExtractJwt = passportJWT.ExtractJwt; //extract jwt token
let Strategy = passportJWT.Strategy; //策略選擇為jwt
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
        let extracted = {
            uid: payload.iss,
            expireAt: payload.exp
        }
        done(null, extracted);
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {
                session: false
            });
        }
    };
};