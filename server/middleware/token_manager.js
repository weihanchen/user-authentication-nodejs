let ExpireToken = require(__base + 'models/expireToken');
let errorBuilder = require(__base + 'services/error/builder');
exports.vertifyToken = (req, res, next) => {
	let token = getToken(req.headers);
	ExpireToken.findOne({
		token: token
	}).then((result) => {
		if (result) next(errorBuilder.unauthorized('Access token has expired'))
		else next()
	}).catch(error =>  {
		/* istanbul ignore next */
		next(error)
	})
}

let getToken = (headers) => {
	if (headers && headers.authorization) return headers.authorization;
	return null;
}
