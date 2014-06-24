var passport = require('passport'),
    User = require('mongoose').model('User');

module.exports = {
    login: function(req, res, next){
        console.log('Request body in login server');
        console.log(req.body);
        var auth = passport.authenticate( 'local', function ( err, user ) {
            if ( err ) {
                console.log( 'Not authen: ' + err );
                return next( err );
            }
            if ( !user ) {
                console.log( 'user: ' + user );
                res.send( { success: false });
            }
            req.logIn( user, function ( err ) {
                if ( err ) {
                    return next( err );
                }
                res.send( { success: true, user: user });
            });
        });
        auth( req, res, next );
    },
    loginHandle: function(req, res, next){
        var auth = passport.authenticate('local', {
            successRedirect : '/home',
            failureRedirect : '/'
        });
        auth(req, res, next);
    },
    isAuthenticated: function(req, res, next){
        if(!req.isAuthenticated()){
            res.status(403);
            res.end();
        }
        else{
            next();
        }
    },
    logout: function(req, res, next){
        req.logout();
        res.status(200);
        res.end();
    }
}