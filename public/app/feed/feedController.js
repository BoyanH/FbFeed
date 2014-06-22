app.controller('FeedController', function($scope, $rootScope, FacebookService, 
	$modal, $log, $rootScope, $sce,EmbedService, ButtonsFacebookService){
    $scope.stillLoding = true;
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

					var data = response.data,
						idComment,
						idFrom;
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
                        //user likes a photo
                        /*if(data[t].story){
                            if(data[t].story.indexOf('likes a photo')>0){
                                $scope.feeds[t].postPhoto = 'https://graph.facebook.com/' + 
                                    data[t].id.slice(data[t].id.indexOf('_')+1,data[t].id.length) +
                                        '/picture';
                            }
                        }*/

            			else if ( data[t] && $scope.feeds[t].type == 'video' ) {

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
                                        if ( $scope.feeds[k].type == "photo" ) {
                                            $scope.feeds[k].postPhoto = "https://graph.facebook.com/" + $scope.feeds[k].object_id + "/picture";
                                        }
                    			}
                			}

                			$scope.busy = false;

            			})
        			}
        			$scope.share = function ( item ) {

            			if ( item.shares ) {
                			item.shares.count = item.shares.count + 1;
            			}
            			ButtonsFacebookService.share( item ).then(function(success){
                			if(success){
                    			Auth.update(Identity.currentUser, item.from.id).then(function(success){
                        			console.log('Successfully Updated User!');
                    			});
                			}
                			else{
                    			//do smth P.S. remove alerts in buttonsFacebook like/comment/share
                			}
            			});;
        			}

        			$scope.like = function ( item ) {
            			ButtonsFacebookService.like( item ).then(function(success){
                			if(success){
                    			Auth.update(Identity.currentUser, item.from.id).then(function(success){
                        			console.log('Successfully Updated User!');
                    			});
                			}
                			else{
                    			//do smth P.S. remove alerts in buttonsFacebook like/comment/share
                			}
            			});
        			}

        			$scope.commentWindow = function ( feed ) {
            			$scope.feeds[feed].wantToComment = true;
            			$scope.feeds[feed].showComments = true;
            			idComment = data[feed].id;
            			idFrom = $scope.pages[feed].from.id;
        			}
        			$scope.comment = function ( commentInput ) {
            			var itemToComment = {};
            			itemToComment.id = idComment;
            			itemToComment.userMessage = commentInput.message
            			ButtonsFacebookService.comment( itemToComment ).then(function(success){
                			if(success){
                    			Auth.update(Identity.currentUser, idFrom).then(function(success){
                        			console.log('Successfully Updated User!');
                    			});
                			}
                			else{
                    			//do smth P.S. remove alerts in buttonsFacebook like/comment/share
                			}
            			});
            			$( '.comment-input' ).val( '' );
        			}

				});
		});

});