app.controller('MainController', function($scope, FacebookService){
    $scope.loggedIn = false;
    $scope.login = function(){
        FacebookService.login();
        $scope.loggedIn=true;
    };
});