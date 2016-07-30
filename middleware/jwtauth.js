let config = require('../config/database'); // get db config file
let User = require('../models/user');
let jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];
    if (token) {
        try {
            let decoded = jwt.decode(token, config.secret);
            if (decoded.exp <= Date.now()) {
            	res.status(400);
            	next('Access token has expired');
            }
            User.findOne({ _id: decoded.iss }, function(err, user) {
                if (err) next(err);
                req.user = user;
                next();
            });

        } catch (err) {
            next(err);
        }
    } else {
        res.status(400);
        next('No token provided');
    }
};
