var mongoose = require('mongoose');
var reviewSchema = require('../models/reviews.js').schema;

var localSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
	latitude: Number,
	longitude: Number,
	reviews: [reviewSchema]
});

//create new class User
var Local = mongoose.model('Local', localSchema);

//exports
module.exports.Local = Local;