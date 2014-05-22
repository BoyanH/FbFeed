app.controller('PagesController', function ($scope, FacebookService) {
    $scope.stillLoding = true;
    FacebookService.getPages().then(function (data) {
        $scope.stillLoding = false;
        $scope.pages = data;
        console.log(data);
    });
});