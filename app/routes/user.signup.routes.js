var signupController = require('../controllers/user.signup.controller')
var loginApiController = require('../controllers/user.loginApi.controller');
module.exports = function ( app, passport ) {

// app.post('/api/user/signup' , signupController.signup);
app.post('/api/user/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup123', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

app.post('/api/user/login' , loginApiController.loginApi);

 app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/error',
        failureFlash: true
    }), function (req, res) {
        res.redirect('/');
    })

}

