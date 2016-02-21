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

//this is for each individual locations
router.get('/:id/review', function(req, res){
		//find one specific location, based on the params.id
		Locations.findById(req.params.id, function(err, location){
		res.render("locations/show.ejs", {
				location: location,
			})
	})
})
//==========================
// CREATE
//==========================






				// // trying to save these locations in DB??
				// for (var i = 0; i < data.businesses.length; i++) {

				//  	var newLocation = new Location({
				//  		name: data.businesses[i].name,
				//  		latitude: data.businesses[i].location.coordinate.latitude,
				//  		longitude: data.businesses[i].location.coordinate.longitude,
				//  		reviews: []
				//  	})

				//  	newLocation.save(function (err){
				//  		console.log("New locations saved???");
				//  	})
			 // 	}



//this is for posting a new location on user ID
router.post('/:id/newreview', function(req, res){
	// console.log(req.params.id + " WAS ACCESSED")
	// console.log("id: " + req.params.id)
	//find Location by id
	Locations.findById(req.body.id, function(err, location){
		// console.log("LOCATIONS WAS ACCESSED");
		//create new article
		var newReview = new Review(req.body);

		location.reviews.push(newReview);
		// console.log(user.local + " WAS ACCESSED");

		newReview.save(function(err, review){

			location.save(function(err, location){
				user.save(function(err, user){


				//redirect back to user show page
				// res.redirect('users/' + req.params.id);
				res.redirect('/locations/' + req.params.id)
				})
			})
		})
	})
})

	// 	 	{ 


	// region: 
	//    	{ span: 
	//       { latitude_delta: 0.1484241577429657,
	//         longitude_delta: 0.1217085298297036 },
	//      center: { latitude: 40.7005884737532, longitude: -73.97186645901351 } },
 //  total: 13573,
 //  businesses: 
 //   [ { is_claimed: true,
 //       rating: 4.5,
 //       mobile_url: 'http://m.yelp.com/biz/doughnut-plant-new-york?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       rating_img_url: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
 //       review_count: 2601,
 //       name: 'Doughnut Plant',
 //       rating_img_url_small: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
 //       url: 'http://www.yelp.com/biz/doughnut-plant-new-york?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       categories: [Object],
 //       menu_date_updated: 1442258741,
 //       phone: '2125053700',
 //       snippet_text: 'My all time favorite Doughnut. Coming from France, where they have really bad reputation, I was skeptical at first. But I always try before judging, and...',
 //       image_url: 'http://s3-media3.fl.yelpcdn.com/bphoto/C0BRwLz9Q2lg1l8_WTUo7A/ms.jpg',
 //       snippet_image_url: 'http://s3-media3.fl.yelpcdn.com/photo/aiEaxTA-VnPYSN2KUSNeaQ/ms.jpg',
 //       display_phone: '+1-212-505-3700',
 //       rating_img_url_large: 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
 //       menu_provider: 'single_platform',
 //       id: 'doughnut-plant-new-york',
 //       is_closed: false,
 //       location: [Object] },
 //     { is_claimed: false,
 //       rating: 4.5,
 //       mobile_url: 'http://m.yelp.com/biz/dough-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       rating_img_url: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
 //       review_count: 1287,
 //       name: 'Dough',
 //       rating_img_url_small: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
 //       url: 'http://www.yelp.com/biz/dough-brooklyn?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       categories: [Object],
 //       menu_date_updated: 1455911568,
 //       phone: '3475337544',
 //       snippet_text: 'One of those times that something actually lives up to the hype.\n\nEvery time I drive by, I double park in front of a fire hydrant (oops) and dash in. It\'s...',
 //       image_url: 'http://s3-media2.fl.yelpcdn.com/bphoto/NQX8mMPX2ZZOMVYL_mLNpA/ms.jpg',
 //       snippet_image_url: 'http://s3-media4.fl.yelpcdn.com/photo/sU08D7-MfutZCG3A65e6PQ/ms.jpg',
 //       display_phone: '+1-347-533-7544',
 //       rating_img_url_large: 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
 //       menu_provider: 'single_platform',
 //       id: 'dough-brooklyn',
 //       is_closed: false,
 //       location: [Object] },
 //     { is_claimed: true,
 //       rating: 4.5,
 //       mobile_url: 'http://m.yelp.com/biz/dough-new-york-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       rating_img_url: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
 //       review_count: 717,
 //       name: 'Dough',
 //       rating_img_url_small: 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
 //       url: 'http://www.yelp.com/biz/dough-new-york-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=Qd0zXw0AHk_My8Jxwom2Kg',
 //       categories: [Object],
 //       phone: '2122436844',
 //       snippet_text: 'Whenever I need to satisfy a donut craving, Dough is where I go. For $3-3.50, they are well worth the buy for the size and taste. They\'re always fresh,...',
 //       image_url: 'http://s3-media4.fl.yelpcdn.com/bphoto/We8AUrRETTitgadOOuLvaQ/ms.jpg',
 //       snippet_image_url: 'http://s3-media1.fl.yelpcdn.com/photo/62Y6Wc6r37ZiYx0tiBiGqA/ms.jpg',
 //       display_phone: '+1-212-243-6844',
 //       rating_img_url_large: 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
 //       id: 'dough-new-york-2',
 //       is_closed: false,
 //       location: [Object] },
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
	// 	})
	// 	.catch(function (err) {
	// 	  console.error(err);
	// 	});

// })// ends router.get('/')







//==========================
// DELETE
//==========================



//==========================
// EXPORTS
//==========================
module.exports = router;