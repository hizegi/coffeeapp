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
//index page: find all users
router.get('/', function(req, res) {
	//GIVES A BOOLEAN based on Login Status (isAuthenticated)
	res.locals.login = req.isAuthenticated();
	User.find({}, function(err, user){

		res.render('users/index.ejs', {
			user: user
		})
	})
});
//==========================
// SHOW
//==========================

//this is for logging out
//goes back to /users main page
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
		//find one specific location, based on the params.id
		// Locations.findById(req.params.id, function(err, location){
		// res.render("locations/show.ejs", {
		// 		location: location,
		// 	})

	res.send("This is the review page for this user")

})

//this is for show page ONLY IF logged in
router.get('/:id', isLoggedIn, function(req, res) {
	//user persisted in session, created req.user
	//sees if user logged in matches his own req.params.id page
	//if true, then restrict what is shown on the show.ejs page
	res.locals.usertrue = (req.user.id == req.params.id);

	//another way to write that
	// req.user.id == req.params.id ? res.locals.usertrue = true : res.locals.usertrue = false:

	// console.log("/:id was accessed")
	//find all locations
	// Local.find({}, function(err, local){
		//find one specific user, based on the params.id
		User.findById(req.params.id, function(err, user){
			res.render('users/show.ejs', {
				user: user,
				// local: local
			})
		// })
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

// //this is for posting a new location on user ID
// router.post('/:id/', function(req, res){
// 	// console.log(req.params.id + " WAS ACCESSED")
// 	// console.log("id: " + req.params.id)
// 	//find User by ID
// 	User.findById(req.params.id, function(err, user){
// 		// console.log(user.username + user.local + " WAS ACCESSED");
// 		//find location by hidden id

// 		var newLocation = new Locations(req.body);

// 		user.locations.push(newLocation);
// 		// console.log(user.local + " WAS ACCESSED");

// 		newLocation.save(function(err, local){

// 				user.save(function(err, user){


// 				//redirect back to user show page
// 				// res.redirect('users/' + req.params.id);
// 				res.redirect('/users/' + req.params.id)
// 			})

// 		})
// 	})
// })

//this is for search results based on user's zipcode entered
// returns 10 results
router.post("/:id/locations", function(req, res){

	//find User by ID
	User.findById(req.params.id, function(err, user){

	//search by zipcode (req.params this?) 
	var zipcode = req.body.zipcode;

	// searches donuts in zipcode, limit 10 results
	yelp.search({ term: 'donuts', location: zipcode, limit: 10 })
		.then(function (data) {

			var data = data;


			//render a page
		 	res.render("locations/index.ejs", {
		 		data: data,
		 		user: user
		 	});
		 	// res.send(data);

		 	return data

		 })
	})
})

// POST review: saves Review, Location, and User
router.post('/:id/reviews', function(req, res){

	//Find the logged in user
	User.findById(req.params.id, function(err, user){

		// console.log(user.locations);

		var newLocation = new Locations({
			nameid: req.body.nameid,
			name: req.body.name,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			reviews: []
		})

		// console.log(newLocation);
		//push this Location into user
		user.locations.push(newLocation);

		//find location by nameid
		Locations.find({nameid: req.body.nameid}, function(err, location){

			var newReview = new Review({
				best: req.body.best,
				comments: req.body.comments
			})

			//push this Review into this location
			location.reviews.push(newReview);

			//save new Review
			newReview.save(function(err, review){

				//save this new location
				newLocation.save(function(err, location){
				console.log("IT SAVED??? Check mongo")

					//save user
					user.save(function(err, user){

						//show show page
						res.render("locations/show.ejs", {
							user: user,
							location: location,
							review: review
							})
					})
				})
			})
		})
	})
}); //ends post


//==========================
// DELETE
//==========================


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