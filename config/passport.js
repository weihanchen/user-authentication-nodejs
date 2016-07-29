let JwtStrategy = require('passport-jwt').Strategy;
 
// load up the user model
let User = require('../app/models/user');
 
module.exports = (passport,secret) =>{
  let opts = {};
  opts.secretOrKey = secret;//取得密鑰
  passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
    User.findOne({id: jwt_payload.id}, (err, user) =>{
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