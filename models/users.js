var mongoose = require('mongoose');
var locationSchema = require('./locations.js').schema;
var bcrypt = require('bcrypt-nodejs');

///STILL NEED TO REFERENCE LOCAL SCHEMA IN LINE 11

var userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	locations: [locationSchema]
});



// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//create new class User
var User = mongoose.model('User', userSchema);

//exports
module.exports = User;



