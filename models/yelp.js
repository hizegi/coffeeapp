var Yelp 		   = require('yelp');
var mongoose 	   = require('mongoose');


//authentication code for yelp
var yelp = new Yelp({
  consumer_key: 'Qd0zXw0AHk_My8Jxwom2Kg',
  consumer_secret: 'JRXvORk6MN0H-e9XRseHdwecNIg',
  token: 'yTWo_vSSCvhzhpdEBE8unE3WW34aI48i',
  token_secret: '4wsJMCDo-88GzPwjkZR1UpXBfpQ'
});


module.exports = yelp;