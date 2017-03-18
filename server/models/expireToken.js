const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpireTokenSchema = new Schema({
	token: {
		type: String,
		unique: true,
		required: true
	},
	expireAt: {
		type: Date,
		required: true
	}
});

ExpireTokenSchema.index({
	expireAt: 1
}, {
	expireAfterSeconds: 0
});

module.exports = mongoose.model('ExpireToken', ExpireTokenSchema);
