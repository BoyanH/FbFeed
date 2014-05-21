var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider){

    var checkConnected = {
        connect:{
            authenticate: function(FacebookService){
                return FacebookService.checkStatus() == 'connected';
            }
        }
    }

    $routeProvider
        .when('/', {
            templateUrl : '/partials/main/home',
            controller: 'MainController'
        })
        .when('/home', {
            templateUrl: '/partials/feed/feed',
            controller: 'FeedController',
        });
});