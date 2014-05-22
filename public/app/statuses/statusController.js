app.controller('StatusController', function($scope, FacebookService){
    $scope.stillLoding = true;
    FacebookService.getStatuses().then(function(data){
        
        console.log(data);
        $scope.allStatuses = data;
        
        var k = 0;
        function profileImageLoop() {
            FacebookService.getPictureByID($scope.allStatuses[k].from.id)
                .then(function (url) {
                    $scope.allStatuses[k].profileImage = url;
                    k++;
                    if (k < $scope.allStatuses.length) {
                        setTimeout(profileImageLoop, 1);
                    }
                });
        }
        profileImageLoop();

        $scope.statuses = $scope.allStatuses.splice(0, 10);
        $scope.stillLoding = false;
    });

    $scope.changePage = function (page) {

    	$scope.statuses = $scope.allStatuses.splice(0, page*10);
    }
});