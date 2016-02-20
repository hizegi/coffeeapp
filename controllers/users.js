//==========================
// REQUIREMENTS
//==========================
var express = require("express");
var router = express.Router();
var User = require("../models/users.js");
var Locations = require("../models/locations.js");
var mongoose = require("mongoose");
var passport = require("passport");


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


// this is for JSON to check all users
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

//this is for posting a new location on user ID
router.post('/:id/', function(req, res){
	// console.log(req.params.id + " WAS ACCESSED")
	// console.log("id: " + req.params.id)
	//find User by ID
	User.findById(req.params.id, function(err, user){
		// console.log(user.username + user.local + " WAS ACCESSED");
		//find location by hidden id

		var newLocation = new Locations(req.body);

		user.locations.push(newLocation);
		// console.log(user.local + " WAS ACCESSED");

		newLocation.save(function(err, local){

				user.save(function(err, user){


				//redirect back to user show page
				// res.redirect('users/' + req.params.id);
				res.redirect('/users/' + req.params.id)
			})

		})
	})
})
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