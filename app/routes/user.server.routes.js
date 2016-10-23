module.exports = function (app, passport) {



app.get('/api/user/facebookLogin', passport.authenticate('facebook-passport'), function(req, res){});

app.get('/auth/facebook/callback', passport.authenticate('facebook-passport', {
	successRedirect : 'profile',
	failureRedirect	: "error", 
	}), function(req, res) {
		res.redirect('index.html');
	}
);

  app.get('/api/user/googleLogin', passport.authenticate('google-passport', {
        scope: 'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    }), function (req, res) {})

 
 app.get('/api/user/google/callback', passport.authenticate('google-passport', {
        successRedirect: '/sociallogin',
        failureRedirect: '/error'
    }), function (req, res) {

    });

  app.get("/api/user/twitterLogin", passport.authenticate('twitter-password'), function (req, res) {});
    
    app.get('/auth/twitter/callback', passport.authenticate('twitter-password', {
        successRedirect: '/sociallogin',
        failureRedirect: '/error'
    }), function (req, res) {
        res.redirect('index.html');
    });




app.get('/logout', function(req, res){ 
	req.logout();
	res.redirect('/')
});


}