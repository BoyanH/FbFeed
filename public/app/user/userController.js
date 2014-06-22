app.controller('UserController', function($scope, FacebookService, $rootScope, $location){
    FacebookService.getAuthData()
        .then(function (data) {
            $rootScope.user = data;
            $scope.profilePicture = FacebookService.getUserProfilePicture();
    })

    if (!$rootScope.user) {
    	setTimeout(checkForUser, 2000);
    }

    function checkForUser () {
    	console.log('checking');
        
    	FacebookService.getAuthData()
	        .then(function (data) {
	            $rootScope.user = data;
	            $scope.profilePicture = FacebookService.getUserProfilePicture();
	    });

	    if(!$rootScope.user) {
        	setTimeout(checkForUser, 2000);
        }
    }

    $scope.logout = function () {
    	FacebookService.logout();
    	$rootScope.user = undefined;
    }
});