const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

const userSchema = new mongoose.Schema({
    fullname: requiredString,
    email: requiredString,
    password: requiredString
});

module.exports = mongoose.model('users', userSchema);