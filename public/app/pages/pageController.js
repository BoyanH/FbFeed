app.controller('PagesController', function ($scope, FacebookService) {
    $scope.stillLoding = true;
    FacebookService.getPages().then(function (data) {
        $scope.pageImages = [];
        $scope.pages = data;
        var k = 0;
        $scope.appID = FacebookService.getAppID();
        function go() {
            FacebookService.getPageProfilePictureByID(data[k].from.id)
                .then(function (url) {
                    console.log(url);
                    $scope.pages[k++].profileImage = url;
                    if (k < data.length) {
                        setTimeout(go, 1);
                    }
                })
        }
        go();
        $scope.stillLoding = false;
        console.log(data);
    });
});