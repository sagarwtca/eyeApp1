var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var port =Number(process.env.port||3000 );
app.set('port', (process.env.PORT || 5000));
var path = require( 'path' );
app.use(bodyParser.json());
var flash=require("connect-flash");
app.use(flash());
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(require('express-session')({
  secret : 'keyboard-cat',
  resave : false,
  saveUninitialized : false
}))
require('./app/config/passport')(passport);
require('./app/routes/user.server.routes')(app, passport);
require('./app/routes/product.server.routes')(app);
require('./app/routes/user.signup.routes')(app, passport);
app.get('/', function(req, res) {
	res.render(path.join(__dirname + '/public/index.html'))
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});