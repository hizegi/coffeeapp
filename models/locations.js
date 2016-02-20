var mongoose = require('mongoose');
var reviewSchema = require('./reviews.js').schema;

var localSchema = new mongoose.Schema({
	name: String,
	latitude: Number,
	longitude: Number,
	reviews: [reviewSchema]
});

//trying to by-pass empty reviews for saved locations
localSchema.pre('save', function (next) {
            if (this.isNew) {
                if (this.reviews.length == 0) {
                    this.reviews = undefined;       
                }
                else if (this.reviews.length == 1 && this.reviews[0] == null) {
                    this.reviews = [];
                }                                                                                                                    
            }
            next();
});


//create new class User
var Local = mongoose.model('Local', localSchema);

//exports
module.exports = Local;