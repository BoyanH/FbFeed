app.controller('StatusController', function($scope, FacebookService){
    
    FacebookService.getStatuses().then(function(data){
        
        console.log(data);
        $scope.allStatuses = data;
        $scope.statuses = $scope.allStatuses.splice(0, 10);
    });

    $scope.changePage = function (page) {

    	$scope.statuses = $scope.allStatuses.splice(0, page*10);
    }

});