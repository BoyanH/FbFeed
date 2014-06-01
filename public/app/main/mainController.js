app.controller('MainController', function($scope, $rootScope, $location, FacebookService, Auth){
    $scope.loggedIn = false;
    $scope.login = function(){
        FacebookService.login()
         .then(function (data) {

         	FacebookService.getAuthData()
				.then(function (data) {
					$rootScope.user = data;
                    var user = {};
                    user.id = data.id;
                    user.likes = [];
                    Auth.login(user).then(function(){
                        console.log('Logged in the server');
                    });
				})
				.then(function () {
					$location.path('/home');
				})
         });

     }

 });