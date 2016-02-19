var mongoose = require('mongoose');


var localSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	latitude: Number,
	longitude: Number
});

//create new class User
var Local = mongoose.model('Local', localSchema);

//exports
module.exports.Local = Local;