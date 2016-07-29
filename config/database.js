module.exports = {
  'secret': process.env.SECRET_KEY || 'user_auth_demo',
  'database': process.env.MONGO_CONNECTION || 'mongodb://user_auth_demo:a12345@ds031895.mlab.com:31895/user_auth_demo'
};