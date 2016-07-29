let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');
let passport = require('passport');
require('./config/passport')(passport);
let config = require('./config/database'); // get db config file
let User = require('./app/models/user'); // get the mongoose model
let port = process.env.PORT || 8080;
let jwt = require('jwt-simple');
let mongoConnection = process.env.MONGO_CONNECTION || 'mongodb://user_auth_demo:a12345@ds031895.mlab.com:31895/user_auth_demo';
let secretKey = process.env.SECRET_KEY || 'user_auth_demo';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// log to console
app.use(morgan('dev'));

app.use(passport.initialize());

//api root
app.get('/', (req, res) => {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
mongoose.connect(mongoConnection);
let apiRoutes = express.Router();
app.use('/api', apiRoutes);


// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
