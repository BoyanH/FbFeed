var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap']).value('toastr', toastr);

app.config(function($routeProvider, $httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    var routerCheck = {
        connect:{
            authenticate: function(Auth){
                return Auth.isAuthenticated();
            }
        },
        authenticated: {
            authenticate: function(Auth){
                return Auth.notAuthenticated();
            }
        }
    }

    $routeProvider
        .when('/', {
            templateUrl : '/partials/main/home',
            controller: 'MainController',
            resolve: routerCheck.authenticated
        })
        .when('/home', {
            templateUrl: '/partials/feed/feed',
            controller: 'FeedController',
            resolve: routerCheck.connect
        })
        .when('/pages', {
            templateUrl: '/partials/pages/pages',
            controller: 'PagesController',
            resolve: routerCheck.connect
        })
        .when('/statuses', {
            templateUrl: '/partials/statuses/statuses',
            controller: 'StatusController',
            resolve: routerCheck.connect
        })
        .when('/posts', {
            templateUrl: '/partials/posts/posts',
            controller: 'PostsController',
            resolve: routerCheck.connect
        })
        .when('/videos', {
            templateUrl: '/partials/videos/videos',
            controller: 'VideosController',
            resolve: routerCheck.connect
        })
        .when('/notifications/:notificationId', {
            templateUrl: '/partials/notifications/notification',
            controller: 'NotificationsController',
            resolve: routerCheck.connect
        }).otherwise({redirectTo:'/'});
});
app.run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        if(rejection === 'not-authorized'){
            $location.path('/');
        }
        if(rejection == 'authorized'){
            $location.path('/home');
        }
    });
});