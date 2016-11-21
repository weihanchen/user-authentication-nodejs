module.exports = {
  'secret': process.env.SECRET_KEY || 'user_auth_demo',
	'database': process.env.MONGO_CONNECTION || 'mongodb://travis:test@127.0.0.1:27017/user_auth_demo'
};