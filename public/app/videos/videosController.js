app.controller('VideosController', function($scope, FacebookService){
    
    FacebookService.getVideos().then(function(data){
        
        console.log(data);
        $scope.allVideos = data;
        $scope.videos = $scope.allVideos.splice(0, 10);
    });

    $scope.changePage = function (page) {

    	$scope.videos = $scope.allVideos.splice(0, page*10);
    }

});