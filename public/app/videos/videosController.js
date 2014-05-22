app.controller('VideosController', function($scope, FacebookService){
    
    FacebookService.getVideos().then(function(data){
        
        console.log(data);
        $scope.allVideos = data;
        $scope.videos = $scope.allVideos.splice(0, 10);
    })
    .then(function () {


    	$scope.changePage = function (page) {

	    	$scope.videos = $scope.allVideos.splice(0, page*10);
	    }

	    for (var j=0; j<$scope.videos.length; j++) {

	    	var videolink = $scope.videos[j].link,
	    		indexOfV = videolink.indexOf("v=");

	    	$scope.videos[j].embedLink = 'http://www.facebook.com/v/' + videolink.substring(indexOfV + 2);
	    }

	    console.log($scope.videos);
    })

});