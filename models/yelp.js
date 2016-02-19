var Yelp 		   = require('yelp');
var mongoose 	   = require('mongoose');


//authentication code for yelp
var yelp = new Yelp({
  consumer_key: 'Qd0zXw0AHk_My8Jxwom2Kg',
  consumer_secret: 'JRXvORk6MN0H-e9XRseHdwecNIg',
  token: 'yTWo_vSSCvhzhpdEBE8unE3WW34aI48i',
  token_secret: '4wsJMCDo-88GzPwjkZR1UpXBfpQ'
});



// yelp.search({ term: 'donuts', location: 'NYC' })
// 		.then(function (data) {

// 			search = data;
// 			return search;
// 		 	console.log("Yelp search is working");
// 		})
// 		.catch(function (err) {
// 		  console.error("Yelp error", err);
// 		});
// var Yelp = mongoose.model('Yelp', yelp);

module.exports = yelp;