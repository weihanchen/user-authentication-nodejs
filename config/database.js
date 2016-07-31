module.exports = {
  'secret': process.env.SECRET_KEY || 'user_auth_demo',
  'database': process.env.MONGO_CONNECTION || 'mongodb://username:password@localhost:27017/user_auth_demo'
};