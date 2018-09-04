const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const isEmail = require('validator').isEmail;

const userSchema = mongoose.Schema({
    name: {
        first: { type: String, },
        last: { type: String, },
    },
    role: { type: String, required: true },
    email: { type: String, required: 'An email address is required.', index: true, trim: true, lowercase: true, unique: true, validate: [isEmail, 'Please enter a valid email address.'] }
});

userSchema.virtual('fullName').get(function() {
    if (this.name) {
        return `${this.name.first} ${this.name.last}`;
    } else {
        return 'Unknown Name';
    }
});

userSchema.methods.serialize = function() {
    return {
        id: this._id,
        name: this.fullName,
        role: this.role,
        email: this.email,
    }
};

userSchema.query.byEmail = function(email) {
    return this.findOne({ email: new RegExp(email, 'i') });
}

const User = mongoose.model('User', userSchema);

module.exports = User;