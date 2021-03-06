﻿var users = require('../controllers/userController.js'),
    auth = require('./auth.js'),
    passport = require('passport');

module.exports = function (app) {
    
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName, {
               beautify: true,
        });
    });
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    app.get('*', function (req, res) {
        res.render('index');
    });
};