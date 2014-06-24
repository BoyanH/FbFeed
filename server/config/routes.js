var users = require('../controllers/userController.js'),
    auth = require('./auth.js'),
    passport = require('passport');

module.exports = function (app) {
    /*app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:1234");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    
    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res){

            res.writeHead(200,{'Access-Control-Allow-Origin' : 'http://localhost:1234'});
            // The request will be redirected to Facebook for authentication, so this
            // function will not be called.
    });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {
    });
    //app.get('/auth/facebook', auth.login);
    //app.get('/auth/facebook/callback', auth.loginHandle);
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });*/
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName, {
               beautify: true,
        });
    });
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
    app.post('/api/users', users.createUser);
    app.put('/api/users', auth.isAuthenticated, users.updateUser);
    app.get('*', function (req, res) {
        res.render('index');
    });
};