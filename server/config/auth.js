var passport = require('passport');

module.exports = {
    login: function(req, res, next){
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
        console.log('request user ' + req.user);
        auth( req, res, next );
    }
}