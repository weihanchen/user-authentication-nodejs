module.exports = {
  'admin_account': process.env.ADMIN_ACCOUNT || 'superadmin',
  'admin_password': process.env.ADMIN_PASSWORD || 'superadmin',
  'roles': [
  	{
  		'role': 'admin',
  		'level': Number.MAX_SAFE_INTEGER
  	},
  	{
  		'role': 'user',
  		'level': 0
  	}
  ]
};