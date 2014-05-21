app.controller('MainController', function($scope, $rootScope, $location, FacebookService){
    $scope.loggedIn = false;
    $scope.login = function(){
        FacebookService.login()
         .then(function (data) {

         	FacebookService.getAuthData()
				.then(function (data) {
					$rootScope.user = data;
				})
				.then(function () {
					$location.path('/home');
				})
         });

     }

 });