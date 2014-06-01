var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap']).value('toastr', toastr);

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
        })
        .when('/pages', {
            templateUrl: '/partials/pages/pages',
            controller: 'PagesController'
        })
        .when('/statuses', {
            templateUrl: '/partials/statuses/statuses',
            controller: 'StatusController'
        })
        .when('/posts', {
            templateUrl: '/partials/posts/posts',
            controller: 'PostsController'
        })
        .when('/videos', {
            templateUrl: '/partials/videos/videos',
            controller: 'VideosController'
        })
        .when('/notifications/:notificationId', {
            templateUrl: '/partials/notifications/notification',
            controller: 'NotificationsController'
        });
});