global.__base = __dirname + '/';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//the routing modules
const users = require(__base + 'routes/users');
const initial = require(__base + 'routes/initial');
app.set('port', process.env.PORT || 3000);
const config = require(__base + 'config/database'); // get db config file
const morgan = require('morgan');
const mongoose = require('mongoose');
//middleware
const jwtauth = require(__base + 'middleware/jwtauth')();
const tokenManager = require(__base + 'middleware/token_manager');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json({
	type: '*/*'
}));
//cors middleware,you can use this to ensure security
app.use(cors());

// log to console
app.use(morgan('dev'));
//public folder
app.use(express.static('../public'));
app.use(jwtauth.initialize());
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
const apiRoutes = express.Router(),
	errorHandler = (err, req, res, next) => {
		res.status(err.status || /* istanbul ignore next: tired of writing tests */ 500).json(err);
		next();
	};
apiRoutes.route('/initialize')
	.post(initial.initialize);

apiRoutes.route('/users')
	.post(users.signup);

apiRoutes.route('/users/login')
	.post(users.login);

apiRoutes.route('/users/logout')
	.post(jwtauth.authenticate(), users.logout);

apiRoutes.route('/users/me')
	.get(tokenManager.vertifyToken, jwtauth.authenticate(), users.me);

apiRoutes.route('/users/:id')
	.delete(tokenManager.vertifyToken, jwtauth.authenticate(), users.delete)
	.get(tokenManager.vertifyToken, jwtauth.authenticate(), users.info)
	.put(tokenManager.vertifyToken, jwtauth.authenticate(), users.edit);


app.use('/api', apiRoutes);
app.use(errorHandler);


app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
