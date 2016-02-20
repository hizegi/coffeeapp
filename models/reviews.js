var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
	author: {type: String, required: true, unique: true},
	best: String,
	comments: String,
	dateCreated: {type:Date, default:Date.now}
});

//create new class User
var Review = mongoose.model('Review', reviewSchema);

//exports
module.exports = Review;