const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role: {
        type: String,
        unique: true,
        required: true
    },
    level: {
        type: Number,
        unique: true,
        required: true
    }
});
module.exports = mongoose.model('Role', RoleSchema);
