const nodemon = require('nodemon');

nodemon({
	script:'run.js',
	watch:['*.js','./routes/*.js','./models/*.js','./middleware/*.js','./config/*.js','./services/error/*.js','./services/permissions/*.js']
});

