app.controller('FeedController', function($scope, $rootScope, FacebookService, 
	$modal, $log, $rootScope, $sce,EmbedService, ButtonsFacebookService){
    
    FacebookService.checkStatus()
    	.then(function (data) {
    		console.log('Login status: ' + data);
    	});

	FacebookService.getAuthData()
		.then(function (data) {
			$rootScope.user = data;
			FacebookService.getFeed()
				.then(function (response) {
					console.log(response.data);

					var data = response.data;
        			$scope.feeds = data;
        			$scope.stillLoding = false;
        			console.log(data);
        			$scope.profilePicture = FacebookService.getUserProfilePicture();

        			for ( var z = 0; z < $scope.feeds.length; z++ ) {

            			if ( $scope.feeds[z].application ) {

                			var type = $scope.feeds[z].application.name;
                			if ( type == 'Video' || type == 'YouTube' ) {

                    			$scope.feeds[z] = EmbedService.normalizeLink( $scope.feeds[z] );
                			}
            			}

            			else if ( $scope.feeds[z].type == 'video' ) {

                			$scope.feeds[z] = EmbedService.normalizeLink( $scope.feeds[z] );
            			}
        			}

        			for ( var t = 0; t < data.length; t++ ) {
            			//profile image
            			$scope.feeds[t].profileImage = "https://graph.facebook.com/" + data[t].from.id + "/picture";

            			//type photo post
            			if ( data[t] && data[t].type == "photo" ) {

                			$scope.feeds[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
            			}
            			//type video post
            			if ( data[t] && data[t].application ) {

                			var type = data[t].application.name;
                			if ( type == 'Video' || type == 'YouTube' ) {

                   			 $scope.feeds[t] = EmbedService.normalizeLink( data[t] );
                			}
            			}

            			else if ( data[t] && $scope.pages[t].type == 'video' ) {

                			$scope.feeds[t] = EmbedService.normalizeLink( $scope.feeds[t] );
            			}
        			}
        			$scope.trustSrc = function ( src ) {
            			return $sce.trustAsResourceUrl( src );
        			}

        			$scope.nextPage = function () {

            			$scope.busy = true;
            			var nextPage = response.paging.next;

            			FacebookService.getMoreFeed(nextPage).then(function (pagingResponse) {

                			response.paging = pagingResponse.paging;
                			k = $scope.feeds.length;

                			for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                    			if (pagingResponse.data[i] ) {
                        			$scope.feeds.push( pagingResponse.data[i] );
                    			}
                			}

                			if(pagingResponse.data.length != 0){
                    			for(;k<$scope.feeds.length;k++){
                            			$scope.feeds[k].profileImage = "https://graph.facebook.com/" + 
                                			$scope.feeds[k].from.id + "/picture";
                    			}
                			}

                			$scope.busy = false;

            			})
        			}

				});
		});

});