app.controller('PagesController', function ($scope, FacebookService, PopupService) {
    $scope.stillLoding = true;
    FacebookService.getPages().then(function (data) {
        $scope.pageImages = [];
        $scope.pages = data;
        var k = 0;
        $scope.appID = FacebookService.getAppID();
        function profileImageLoop() {
            FacebookService.getPictureByID(data[k].from.id)
                .then(function (url) {
                    $scope.pages[k++].profileImage = url;
                    if (k < data.length) {
                        setTimeout(profileImageLoop, 1);
                    }
                })
        }
        profileImageLoop();
        for (var t = 0; t < data.length; t++) {
            if(data[t].type=="photo")
                $scope.pages[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
        }
        $scope.stillLoding = false;
        console.log(data);
    });
});