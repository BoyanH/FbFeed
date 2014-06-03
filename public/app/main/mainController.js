app.controller('MainController', function($scope, $rootScope, $location, FacebookService, Auth){
    $scope.loggedIn = false;
    $scope.login = function(){
        FacebookService.login()
         .then(function (data) {
         	FacebookService.getAuthData()
				.then(function (data) {
					$rootScope.user = data;
                    var user = {};
                    user.fbID = data.id;
                    user.password = 'random';
                    user.likes = [];
                    Auth.login(user).then(function(response){
                    });
				})
				.then(function () {
					$location.path('/home');
                    //FacebookService.logout();
				});
         });

     }

 });