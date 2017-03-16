const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require(__base + 'config/database');
const errorBuilder = require(__base + 'services/error/builder');
const ExtractJwt = passportJWT.ExtractJwt; //extract jwt token
const Strategy = passportJWT.Strategy; //策略選擇為jwt
const params = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader() //creates a new extractor that looks for the JWT in the authorization header with the scheme 'JWT',e.g JWT + 'token'
};

module.exports = () => {
    const strategy = new Strategy(params, (payload, done) => {
        //驗證token是否失效
        if (payload.exp <= Date.now()) {
            return done(errorBuilder.unauthorized('Access token has expired'), false);
        }
        const extracted = {
            uid: payload.iss,
            expireAt: payload.exp
        };
        done(null, extracted);
    });
    passport.use(strategy);
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", {
            session: false
        })
    };
};
