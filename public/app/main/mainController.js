<<<<<<< HEAD
﻿app.controller('MainController', function($scope, $rootScope, $location, FacebookService){
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
=======
﻿app.controller('MainController', function($scope, FacebookService){
    $scope.login = function(){
        FacebookService.login();
>>>>>>> 8de91721663b5603f245e74092552b8706fabc69
    };

});