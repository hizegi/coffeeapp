//==========================
// REQUIREMENTS
//==========================
var express = require("express");
var router = express.Router();
var User = require("../models/users.js");
var Locations = require("../models/locations.js")


//==========================
// INDEX
//==========================
router.get('/', function(req, res){
	res.render('users/index.ejs')
})



//==========================
// CREATE
//==========================


//==========================
// DELETE
//==========================



//==========================
// EXPORTS
//==========================
module.exports = router;