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
    //require config
    // require('./config/passport.js')(passport)

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
// CONTROLLERS 
//========================

app.get('/', function(req, res){
	res.send("HEYYYYY THE BEGINNING OF SOMETHING SPECIAL!")
})

var locationsController = require('./controllers/locations.js');
var usersController     = require('./controllers/users.js');

app.use('/locations', locationsController);
app.use('/users', usersController);


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