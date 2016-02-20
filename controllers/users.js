//==========================
// REQUIREMENTS
//==========================
var express = require("express");
var router = express.Router();
var User = require("../models/users.js");
var Locations = require("../models/locations.js")
var mongoose = require("mongoose");
var passport = require("passport");


//==========================
// INDEX
//==========================
router.get('/', function(req, res){
	User.find({}, function(err, user){
		res.render('users/index.ejs', {
			user: user
		})
	})
})
//==========================
// SHOW
//==========================
// this is for JSON to check all users
router.get('/json', function(req, res){
	User.find({}, function(err, users){
		res.send(users)
	})
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
	Local.find({}, function(err, local){
		//find one specific user, based on the params.id
		User.findById(req.params.id, function(err, user){
			res.render('users/show.ejs', {
				user: user,
				local: local
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
		res.send("Hey Sign Up worked");
		// res.redirect('/users/' + req.user.id)
	});

//this is for LOG IN
router.post('/login', passport.authenticate('local-login', {
    // successRedirect : '/users/json', // redirect to the secure profile section
    failureRedirect : '/users' }),// redirect back to the signup page if there is an error
	function (req, res){
		res.redirect('/users/' + req.user.id)
});

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