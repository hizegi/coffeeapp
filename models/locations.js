var mongoose = require('mongoose');
var reviewSchema = require('./reviews.js').schema;

var localSchema = new mongoose.Schema({
	name: {type: String},
	latitude: Number,
	longitude: Number,
	reviews: [reviewSchema]
});

//create new class User
var Local = mongoose.model('Local', localSchema);

//exports
module.exports = Local;