'use strict';
let config = require(__base + 'config/database'); // get db config file
let User = require(__base + 'models/user.js'); // get the mongoose model
let jwt = require('jwt-simple');
let moment = require('moment');
exports.login = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, (error, user) => {
        if (error) res.status(400).send(error);
        if (!user) res.status(400).send({ message: 'User not found.' });
        else {
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (isMatch && !error) {
                    let expires = moment().add(1,'day').valueOf();
                    let token = jwt.encode({
                        iss: user.id,//加密對象
                        exp: expires
                    }, config.secret);
                    res.json({ success: true, token: token });
                } else {
                    res.status(400).send({ message: 'Wrong password.' })
                }
            })
        }
    })
}
exports.me = (req, res, next) => {
    let responseBody = {
        username: req.user.username,
        displayName: req.user.displayName
    }
    res.send(responseBody);
}
exports.signup = (req, res, next) => {
    let requireProperties = ['displayName','password','username'];
    let requireValid = requireProperties.every(property =>{
        if (!req.body.hasOwnProperty(property)){
            res.status(400).send({message: 'Please pass ' + property});
            return false;
        }
        return true;
    })
    if (!requireValid) return;
    if (!req.body.username || !req.body.password) res.status(400).send({ message: 'Please pass username and password' });
    else {
        let newUser = new User({
            username: req.body.username,
            displayName: req.body.displayName,
            password: req.body.password
        })
        User.findOne({username: newUser.username},(error,user) =>{
            if (error) next(error);
            if (user){
                res.status(400);
                next('username already exist.');
            }

        })
        newUser.save((error) => {
            if (error) next(error);
            res.json({ success: true, message: 'Successful signup.' });
        })
    }
}

