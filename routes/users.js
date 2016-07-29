'use strict';
let config = require('../config/database'); // get db config file
let User = require('../models/user.js'); // get the mongoose model
let jwt = require('jwt-simple');
exports.login = (req,res,next) =>{
	User.findOne({
		username: req.body.username
	},(error,user) =>{
		if (error) res.status(400).send(error);
		if (!user) res.status(400).send({message: 'User not found.'});
		else {
			user.comparePassword(req.body.password,(error,isMatch) =>{
				console.log(isMatch)
				if (isMatch && !error){
					let token = jwt.encode(user,config.secret);
					res.json({success: true,token: 'JWT' + token});
				}else {
					res.status(400).send({message: 'Wrong password.'})
				}
			})
		}
	})
}
exports.signup = (req, res, next) => {
	if (!req.body.username || !req.body.password) res.status(400).send({message: 'Please pass username and password'});
	else {
		let newUser = new User({
			username: req.body.username,
			password: req.body.password
		})
		newUser.save((error) =>{
			if (error) res.status(400).send(error);
			res.json({success: true,message: 'Successful signup.'});
		})
	}
}
