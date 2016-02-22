var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
	name: String,
	userid: String,
	nameid: String,
	author: String,
	best: String,
	comments: String,
	imgurl: String,
	dateCreated: {type:Date, default:Date.now}
});

//create new class User
var Review = mongoose.model('Review', reviewSchema);

//exports
module.exports = Review;