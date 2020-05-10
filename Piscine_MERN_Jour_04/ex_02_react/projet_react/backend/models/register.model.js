const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: Boolean,
        required: true,
    }
});
var User = mongoose.model('users', UserSchema);
module.exports = User;