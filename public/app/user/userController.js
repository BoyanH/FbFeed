app.controller('UserController', function($scope, FacebookService, $rootScope){
    FacebookService.getAuthData()
        .then(function (data) {
            $rootScope.user = data;
            $scope.profilePicture = FacebookService.getUserProfilePicture();
    })
});