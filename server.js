//========================
// REQUIREMENTS
//========================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var port           = 3000 || process.env.PORT;
var passport       = require('passport');
var session        = require('express-session');
var cookieParser   = require('cookie-parser');
var morgan         = require('morgan');
// var Yelp 		   = require('yelp');
    //require config
    require('./config/passport.js')(passport)

//========================
// MIDDLEWARES
//========================
//this is for public files
app.use(express.static('public'));
//this is for logger
app.use(morgan('dev'));
//this reads cookies, needed for auth
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//this is methodOverride for POST req
app.use(methodOverride("_method"));

//Thom's methodOverride func
// app.use(methodOverride(function(req, res){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     var method = req.body._method;
//     delete req.body._method;
//     return method;
//   }
// }));

//use for passport
app.use(session({ secret: 'woahwoahwoahthisisnotmybatmanglass' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

//========================
// YELP
//========================


// var yelp = new Yelp({
//   consumer_key: 'Qd0zXw0AHk_My8Jxwom2Kg',
//   consumer_secret: 'JRXvORk6MN0H-e9XRseHdwecNIg',
//   token: 'yTWo_vSSCvhzhpdEBE8unE3WW34aI48i',
//   token_secret: '4wsJMCDo-88GzPwjkZR1UpXBfpQ'
// });


//========================
// CONTROLLERS 
//========================

//redirect to /users automatically
app.get('/', function(req, res){
	res.redirect('/users')
})

var locationsController = require('./controllers/locations.js');
var usersController     = require('./controllers/users.js');
var reviewsController   = require('./controllers/reviews.js')

app.use('/locations', locationsController);
app.use('/users', usersController);
app.use('/test', reviewsController)


//========================
// LISTENERS
//========================

mongoose.connect('mongodb://localhost/coffeeapp');

mongoose.connection.once('open', function(err, data){
    console.log("Mongoose is CONNECTED")
    app.listen(port, function() {
        console.log('RUNNING ON PORT: ' + port);
    });
})