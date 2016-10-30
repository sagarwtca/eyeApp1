var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var socialConfig = require('./socialConfig');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var db = require('../controllers/mongodb.js');

module.exports = function( passport ) {

	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //---------------------------Facebook ----------------------------

   passport.use('facebook-passport', new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : socialConfig.facebookAuth.appId,
        clientSecret    : socialConfig.facebookAuth.secretId,
        callbackURL     : socialConfig.facebookAuth.callback_URL,
        profileFields: ['id', 'emails', 'name']
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
                  db.find('usertest', {"email":profile.emails[0].value}, function(err, result){
                         if(err) {
                             return done(err);
                         }
                         if(result.length) {
                             console.log('fad')
                                return done(null, profile);
                         } else {
                            db.insert('usertest', {"email":profile.emails[0].value, }, function(err, result){
                                console.log();
                                if(err) {
                                    return done(err);
                                } else {
                                    return done(null);
                                }
                            }) 
                         }

                     })   

        });

    }));

///--------------------------------google---------------------------------------------

	passport.use('google-passport', new GoogleStrategy({

        clientID        : socialConfig.googleAuth.appId,
        clientSecret    : socialConfig.googleAuth.secretId,
        callbackURL     : socialConfig.googleAuth.callback_URL,

    },
    function(token, refreshToken, profile, done) {
    	console.log(profile);
               process.nextTick(function() {
                  db.find('usertest', {"email":profile.emails[0].value}, function(err, result){
                         if(err) {
                             return done(err);
                         }
                         if(result.length) {
                                return done(null, profile);
                         } else {
                            db.insert('usertest', {"email":profile.emails[0].value, }, function(err, result){
                                if(err) {
                                    return done(err);
                                } else {
                                    return done(null);
                                }
                            }) 
                         }

                     })   

        });

    }));
///-----------------------Twitter--------------------------------------
	passport.use('twitter-password',new TwitterStrategy({

        consumerKey     : socialConfig.twitterAuth.appId,
        consumerSecret  : socialConfig.twitterAuth.secretId,
        callbackURL     : socialConfig.twitterAuth.callback_URL,

    },
    function(token, tokenSecret, profile, done) {
    	console.log(profile);
        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
       /* process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

    });
*/
    }));

    //----------------------------------local-signup-------------------
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
			passwordField: 'password',
			companyField : 'company',
            // by default, local strategy uses username and password, we will override with email
			passReqToCallback: true
		},
		function (req, email, password, done) {
    			process.nextTick(function () {
                     db.find('usertest', {"email":email}, function(err, result){
                         if(err) {
                             return done(err);
                         }
                         if(result.length) {
                             console.log("-------->",result);
                             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                         } else {
                            db.insert('usertest', {"email":email, "password" :password, "company" :req.body.company}, function(err, result){
                                console.log(err);
                                if(err) {
                                    return done(err);
                                } else {
                                    return done(null);
                                }
                            }) 
                         }

                     })   
			});
		}));

	passport.use('local-login', new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function (req, email, password, done) {
            process.nextTick(function () {
				try {
					db.find("usertest", {"email": email}, function (err, result) {
						if (err) {
							return done(null);
						} else {
                            
							if (result.length) {                            
                                if(result[0].password== password) {
								   console.log(result);
                                    return done(null, result[0]);
                                }
                            }
                            else {    
                                console.log('error')
							    return done(null);
                            }
						}
					})
				} catch (err) {
					return done(null);
				}
			});
            
            
		}));


};
 