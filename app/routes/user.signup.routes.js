// var signupController = require('../controllers/user.signup.controller')
var loginApiController = require('../controllers/user.loginApi.controller');
var jwt = require('jwt-simple');
var config = require('../config/config');
module.exports = function ( app, passport ) {

// app.post('/api/user/signup' , signupController.signup);
app.post('/api/user/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

app.post('/api/user/login' , loginApiController.loginApi);

 app.post('/login', passport.authenticate('local-login', {
         // redirect to the secure profile section
        failureRedirect: '/error',
        failureFlash: true
    }), function (req, res) {
          // generate token using jwt library
            var payload = { "email": req.body.email, "password" : req.body.password };
            var secret = config.secret;  
            var token = jwt.encode(payload, secret);
            res.send({
                "error" : 0,
                "message" : 'user exist',
                "token" :token          
            })
    })

}

