app.controller('MainController', function($scope, FacebookService){
    $scope.login = function(){
        FacebookService.login();
    };
});