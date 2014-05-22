app.controller('VideosController', function($scope, $sce, FacebookService, EmbedService){
    
    $scope.stillLoding = true;

    FacebookService.getVideos().then(function(data){
        
        var k = 0;

        console.log(data);

        $scope.allVideos = [];

        for (var i = 0; i < data.length; i++) {

        	$scope.allVideos[i] = EmbedService.normalizeLink(data[i]);
        }

        $scope.videos = $scope.allVideos.splice(0, 10);

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function go() {
            FacebookService.getPageProfilePictureByID(data[k].from.id)
                .then(function (url) {

                    $scope.videos[k++].profileImage = url;
                    if (k < data.length) {
                        setTimeout(go, 1);
                    }
                })
        }
        if (data.length) {
            go();
        }
        
        $scope.stillLoding = false;
    })
    .then(function (data) {

    	$scope.changePage = function (page) {

	    	$scope.videos = $scope.allVideos.splice(page*10 - 10, page*10);
	    }

    })

});