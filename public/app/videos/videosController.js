app.controller('VideosController', function($scope, FacebookService, EmbedService){
    
    FacebookService.getVideos().then(function(data){
        
        $scope.allVideos = [];
        console.log(data);

        for (var i = 0; i < data.length; i++) {

        	$scope.allVideos[i] = EmbedService.normalizeLink(data[i]);
        }
        
        $scope.videos = $scope.allVideos.splice(0, 10);
    })
    .then(function () {


    	$scope.changePage = function (page) {

	    	$scope.videos = $scope.allVideos.splice(page*10 - 10, page*10);
	    }


    })

});