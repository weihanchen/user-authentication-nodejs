let adminRoleLevel = Number.MAX_SAFE_INTEGER;
let userRoleLevel = 0;
module.exports = {
  'admin_account': process.env.ADMIN_ACCOUNT || 'superadmin',
  'admin_password': process.env.ADMIN_PASSWORD || 'superadmin',
  'admin_role_level': adminRoleLevel,
  'roles': [
  	{
  		'role': 'admin',
  		'level': adminRoleLevel
  	},
  	{
  		'role': 'user',
  		'level': userRoleLevel
  	}
  ],
  'user_role_level': userRoleLevel
};