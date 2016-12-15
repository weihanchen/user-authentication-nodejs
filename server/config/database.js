module.exports = {
	'secret': process.env.SECRET_KEY || /* istanbul ignore next: tired of writing tests */ 'user_auth_demo',
	'database': process.env.MONGO_CONNECTION || /* istanbul ignore next: tired of writing tests */ 'mongodb://travis:test@127.0.0.1:27017/user_auth_demo'
};
