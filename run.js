const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//the routing modules
const users = require('./routes/users');
app.set('port',process.env.PORT || 3000);
let config = require('./config/database'); // get db config file
let morgan = require('morgan');
let mongoose = require('mongoose');
let passport = require('passport');
require('./config/passport')(passport);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// log to console
app.use(morgan('dev'));

app.use(passport.initialize());


mongoose.connect(config.database);
let apiRoutes = express.Router();
apiRoutes.route('/users')
	.post(users.signup)
apiRoutes.route('/users/login')
	.post(users.login)
app.use('/api', apiRoutes);


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
