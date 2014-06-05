var passport = require('passport'),
    User = require('mongoose').model('User'),
    LocalStrategy   = require('passport-local').Strategy;
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){
   passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user.fbID)
        }
    });
    passport.deserializeUser(function (id, done) {
        User.findOne({ fbID: id }).exec(function (err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    });
    passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with fbID
        usernameField : 'fbID',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, fbID, password, done) { // callback with fbID and password from our form

        User.findOne({ fbID: fbID }).exec(function (err, user) {

            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if (user) {
                console.log('Found user in passport.js');
                return done(null, user);
            }
            else {
                return done(null, false);
            }
 
        });

    }));
};