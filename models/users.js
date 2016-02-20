var mongoose = require('mongoose');
var locationSchema = require('./models/locations').schema;
var bcrypt = require('bcrypt-nodejs');

///STILL NEED TO REFERENCE LOCAL SCHEMA IN LINE 11

var userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
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
module.exports.User = User;
module.exports.Local = Local;



