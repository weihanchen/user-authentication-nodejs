const ExpireToken = require(__base + 'models/expireToken');
const errorBuilder = require(__base + 'services/error/builder');
exports.vertifyToken = (req, res, next) => {
	const token = getToken(req.headers);
	ExpireToken.findOne({
		token: token
	}).then((result) => {
		if (result) next(errorBuilder.unauthorized('Access token has expired'));
		else next();
	}).catch(error =>  {
		/* istanbul ignore next */
		next(error);
	});
};

const getToken = (headers) => {
	if (headers && headers.authorization) return headers.authorization;
	return null;
};
