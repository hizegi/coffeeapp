//==========================
// REQUIREMENTS
//==========================
var express = require("express");
var router = express.Router();
var User = require("../models/users.js");
var Review = require("../models/reviews.js");
var Locations = require("../models/locations.js");
var passport = require("passport");
var yelp = require('../models/yelp.js');


//==========================
// INDEX
//==========================
//index page
// + Finds all users
// + Finds all reviews
// + requires authentication for restricted access
router.get('/', function(req, res) {
	//GIVES A BOOLEAN based on Login Status (isAuthenticated)
	res.locals.login = req.isAuthenticated();
	User.find({}, function(err, user){
		Review.find({}, function(err, review){
			res.render('users/index.ejs', {
			user: user, 
			review: review
			})
		})
	})
});


//==========================
// SHOW
//==========================

//this is for logging out
router.get('/logout', function(req, res){
	req.logout();
res.redirect('/users')
})

// this is for JSON to check all users (testing)
router.get('/json', function(req, res){
	User.find({}, function(err, users){
		res.send(users)
	})
})

// json for specific user, used ajax to display markers on map??
router.get('/:id/json', function(req, res) {
	User.findById(req.params.id, function(err, user) {
		res.send(user);
	});
});

//this is for each user's reviews
router.get('/:id/review', function(req, res){
	User.findById(req.params.id, function(err, user){
		Review.find({userid: req.params.id}, function(err, review){
			res.render("./reviews/edit.ejs", {
				user: user,
				review: review
			})
		})
	})
})

//this is for show page ONLY IF logged in
//shows reviews FOR this user id (by searching userid in reviews)
router.get('/:id', isLoggedIn, function(req, res) {
	//user persisted in session, created req.user
	//sees if user logged in matches his own req.params.id page
	//if true, then restrict what is shown on the show.ejs page
	res.locals.usertrue = (req.user.id == req.params.id);

	//find one specific user, based on the params.id
	User.findById(req.params.id, function(err, user){
		//find reviews by author
		Review.find({userid: req.user.id}, function(err, review){

			res.render('users/show.ejs', {
				user: user,
				review: review
			})
		})
	})
});

//==========================
// CREATE
//==========================
// process the signup form
router.post('/', passport.authenticate('local-signup', {
    // successRedirect : '/users/json', // redirect to the secure profile section
    failureRedirect : '/users' }),// redirect back to the signup page if there is an error
	function (req, res){
		// res.send("Hey Sign Up worked");
		res.redirect('/users/' + req.user.id)
	});

//this is for LOG IN
router.post('/login', passport.authenticate('local-login', {
    // successRedirect : '/users/json', // redirect to the secure profile section
    failureRedirect : '/users' }),// redirect back to the signup page if there is an error
	function (req, res){
		res.redirect('/users/' + req.user.id)
});


//this is for search results based on user's input
// returns 10 results
router.post("/:id/locations", function(req, res){

	//find User by ID
	User.findById(req.params.id, function(err, user){

		//search by Yelp's Search API
		// accepts zipcode, neighborhood, city
		var zipcode = req.body.zipcode;

		// searches donuts in zipcode, limit 10 results
		yelp.search({ term: 'donuts', location: zipcode, limit: 10 })
			.then(function (data) {
				
			 	res.render("users/locations.ejs", {
			 		data: data,
			 		user: user
			 	});
		})
	})
})

// POST review: saves Review, Location, and User
router.post('/:id/reviews', function(req, res){

	//Find the logged in user
	User.findById(req.params.id, function(err, user){
		console.log("user found")

		// console.log(user.locations);

		var location = new Locations({
			nameid: req.body.nameid,
			name: req.body.name,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			reviews: []
		})

		//save the new location (the one clicked on by user)
		location.save(function(err, location){
			console.log("Location got saved? check database")

		// console.log("New Location was Saved");
		//push this Location into user
		// user.locations.push(location);
		User.update({_id: req.params.id},
			{$addToSet: {locations: location}}, function(err, user){
				console.log("USER LOCATION UPDATED: check mongo")
			})
		// user.save();
		})
	})//ends find UserById

		//find location by nameid
	Locations.find({nameid: req.body.nameid}, function(err, location){

		// console.log("Location found! It's name is: ", req.body.nameid)
		// console.log("LOCATION EXISTS: name is: ", location)
		//find user Id for name
		User.findById(req.params.id, function(err, user){

			var review = new Review({
				nameid: req.body.nameid,
				userid: req.user.id,
				best: req.body.best,
				comments: req.body.comments,
				author: user.username
			})

			//save new Review
			review.save(function(err, review){
				console.log("***new review was saved user id is: ", review.userid);

			//find the just save location, and now update it with the review just made
			Locations.update({nameid: req.body.nameid},
			 { $addToSet : {reviews: review } },
			 function (err, response) {
			 	console.log("LOCATION UPDATED??? Check MONGO for: ", response)

					//Go back to users page
					res.redirect("/users/" + req.params.id)
				});
			}) 
		})
	})

}); //ends post

//this is for the editing of user review
router.post('/:id/review', function(req, res){
	User.findById(req.params.id, function(err, user){
		Review.findById(req.body.review_id, function(err, review){
			res.render("./reviews/edit.ejs", {
				user: user,
				review: review
			})
		})
	})
})

//==========================
// UPDATE
//==========================
//this is to update the review
router.put('/:id/reviewedit', function(req, res){
	// req.body.id = parseInt(req.params.id);

	Review.findById(req.body.review_id, function(err, review){
		console.log("The review was accessed ")
	//if user ID matches req.params.id, go ahead and make changes to review
	if (req.user.id == req.params.id){

		// console.log("user is verified to post");
			//then declare new value
			review.best = req.body.best;
			review.comments = req.body.comments;
			review.imgurl = req.body.imgurl;

			review.save(function(err){

				console.log("The new stuff has been save?!!!")

				res.redirect('/users/' + req.params.id);
			})
		}
	})
})


//==========================
// DELETE
//==========================
//this removes the user and All reviews associated
router.delete('/:id', function(req, res){
	console.log("DELETE ROUTE ACCESSED WOO");

	//find review by userID
	Review.remove({userid: req.user.id}, function(err, review){
		console.log("Review Delete Accessed")

		//find user and remove
		User.findByIdAndRemove(req.params.id, function(err, user){
			console.log("user has been deleted");
			res.redirect('/users')
		})
	})

})

// this deletes the specific review
router.delete('/:id/deletereview', function(req, res){
	console.log("DELETED REVIEW!")
	Review.findByIdAndRemove(req.body.review_id, function(err, review){
		res.redirect('/users/' + req.params.id)
	})
})

//=====================
// MIDDLEWARE ROUTE FUNCTION for .get('/:id', ISLOGGEDIN...)
//=====================
function isLoggedIn(req, res, next){

	if (req.isAuthenticated())
		return next();

	res.redirect('/')
}




//==========================
// EXPORTS
//==========================
module.exports = router;