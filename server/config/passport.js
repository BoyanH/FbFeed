var User = require('mongoose').model('User'),
    LocalPassport = require('passport-local'),
    passport = require('passport');

module.exports = function(){
    passport.use(new LocalPassport(function (username, password, done) {
        User.findOne({ id: username }).exec(function (err, user) {
            console.log('User in passport.js: ' + user);
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
    }));

    passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user._id)
        }
    });
    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }).exec(function (err, user) {
            console.log('User in passport.js: ' + user);
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
}