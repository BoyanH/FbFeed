app.controller('PagesController', function ($scope, FacebookService) {
    $scope.stillLoding = true;
    FacebookService.getPages().then(function (data) {
        $scope.pageImages = [];
        $scope.pages = data;
        var k = 0;
        $scope.appID = FacebookService.getAppID();
        for (var i = 0; i < data.length; i++)
        {
            FacebookService.getPageProfilePictureByID(data[i].from.id)
                .then(function (url) {
                    console.log(url);
                    $scope.pages[k++].profileImage = url;
                })
        }
        $scope.stillLoding = false;
        console.log(data);
    });
});