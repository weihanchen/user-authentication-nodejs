global.__base = __dirname + '/';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

//the routing modules
const users = require(__base + 'routes/users');
const initial = require(__base + 'routes/initial');
app.set('port', process.env.PORT || 9000);
let config = require(__base + 'config/database'); // get db config file
let morgan = require('morgan');
let mongoose = require('mongoose');
//middleware
let jwtauth = require(__base + 'middleware/jwtauth')();
let tokenManager = require(__base + 'middleware/token_manager');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json({
	type: '*/*'
}));
//cors middleware,you can use this to ensure security
app.use(cors())

// log to console
app.use(morgan('dev'));
//public folder
app.use(express.static('../public'))
app.use(jwtauth.initialize());
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
let apiRoutes = express.Router();
apiRoutes.route('/initialize')
	.post(initial.initialize)

apiRoutes.route('/users')
	.post(users.signup)

apiRoutes.route('/users/login')
	.post(users.login)

apiRoutes.use(jwtauth.authenticate()).route('/users/logout')
	.post(users.logout)

apiRoutes.use(tokenManager.vertifyToken, jwtauth.authenticate()).route('/users/me')
	.get(users.me)

apiRoutes.use(tokenManager.vertifyToken, jwtauth.authenticate()).route('/users/:id')
	.delete(users.delete)
	.get(users.info)
	.put(users.edit)


app.use('/api', apiRoutes);
app.use(errorHandler);


app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});

function errorHandler(err, req, res, next) {
	res.status(err.status || 500).json(err);
}


module.exports = app;