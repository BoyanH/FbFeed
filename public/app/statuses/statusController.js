app.controller('StatusController', function($scope, FacebookService){
    $scope.stillLoding = true;
    FacebookService.getStatuses().then(function(data){
        
        console.log(data);
        $scope.allStatuses = data;
        $scope.statuses = $scope.allStatuses.splice(0, 10);
        var k = 0;
        function profileImageLoop() {
            FacebookService.getPictureByID(data[k].from.id)
                .then(function (url) {
                    $scope.statuses[k++].profileImage = url;
                    if (k < data.length) {
                        setTimeout(profileImageLoop, 1);
                    }
                });
        }
        profileImageLoop();
        $scope.stillLoding = false;
    });

    $scope.changePage = function (page) {

    	$scope.statuses = $scope.allStatuses.splice(0, page*10);
    }
});