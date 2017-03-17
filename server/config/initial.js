const adminRoleLevel = Number.MAX_SAFE_INTEGER;
const userRoleLevel = 0;
module.exports = {
	'admin_account': process.env.ADMIN_ACCOUNT || /* istanbul ignore next: tired of writing tests */ 'superadmin',
	'admin_password': process.env.ADMIN_PASSWORD || /* istanbul ignore next: tired of writing tests */ 'superadmin',
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
