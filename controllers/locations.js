// DO I NEED REVIEWS CONTROLLER?? MAKE THIS YELP CONTROLLER FOR NOW
//==========================
// REQUIREMENTS
//==========================
var express = require("express");
var router = express.Router();
var User = require("../models/users.js");
var Local = require("../models/locations.js");
var Review = require("../models/reviews.js");


//==========================
// INDEX
//==========================
router.get('/', function(req, res){
	res.render("locations/index.ejs");
});

router.get('/json', function(req, res){
	res.redirect("locations/index.ejs")
})

router.get('/show', function(req, res){
	res.render("locations/show.ejs")
})

//show page for location
router.get('/:id', function(req, res){
	//find location based on req.params.id
	Local.find({nameid: req.params.id}, function(err, location){
		Review.find({nameid: req.params.id}, function(err, review){

			// console.log(location.name);
			res.render("locations/show.ejs", {
				location: location[0],
				review: review
			})
		})
	})
})

// //this is for each individual locations
// router.get('/:id/review', function(req, res){
// 		//find one specific location, based on the params.id
// 		Locations.findById(req.params.id, function(err, location){
// 		res.render("locations/show.ejs", {
// 				location: location,
// 			})
// 	})
// })


 // YELP SEARCH RESULTS OBJECT for REFERENCE
 //     { is_claimed: true,
 //       rating: 4.5,
 //       mobile_url: 'http://m.yelp.com/biz/key-and-cup-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       rating_img_url: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
 //       review_count: 52,
 //       name: 'Key&Cup',
 //       rating_img_url_small: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
 //       url: 'http://www.yelp.com/biz/key-and-cup-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       categories: [Object],
 //       menu_date_updated: 1454070220,
 //       phone: '7182220708',
 //       snippet_text: 'I work in the area, and Key & Cup is hands down the best coffee shop. \nThe staff is extremely friendly and accommodating. Their space is small but cozy and...',
 //       image_url: 'http://s3-media2.fl.yelpcdn.com/bphoto/zDeWWbDj93ZeoSIdXLjdwQ/ms.jpg',
 //       snippet_image_url: 'http://s3-media2.fl.yelpcdn.com/photo/Izlwvb-kVXiji7rclDDwAQ/ms.jpg',
 //       display_phone: '+1-718-222-0708',
 //       rating_img_url_large: 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
 //       menu_provider: 'single_platform',
 //       id: 'key-and-cup-brooklyn',
 //       is_closed: false,
 //       location: [Object] } ] })








//==========================
// DELETE
//==========================



//==========================
// EXPORTS
//==========================
module.exports = router;