app.controller('PostsController', function($scope, $rootScope, FacebookService, 
	ButtonsFacebookService, Auth, Identity){
	
	$scope.stillLoding = true;
	var idComment, idFrom;

	FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;

        FacebookService.getPosts().then(function (response){

            var k = 0,
                data = response.data;

            $scope.posts = data;

            //active Points appending loop
            for(var h = 0; h < data.length; h++) {

                var activePoints = $.grep(Identity.currentUser.likes, function(e){ return e.id == data[h].from.id; });
                if(activePoints[0]) {
                        $scope.posts[h].activePoints = activePoints[0].points;
                    }
                        else {
                            $scope.posts[h].activePoints = 0;
                        }
            }

            function profileImageLoop() {
                FacebookService.getPictureByID($scope.posts[k].from.id)
                    .then(function (url) {
                        $scope.posts[k].profileImage = url;
                        k++;
                        if (k < $scope.posts.length) {
                            setTimeout(profileImageLoop, 1);
                        }
                    });
            }
            if(data && data.length != 0){
                profileImageLoop();
            }
            $scope.stillLoding = false;

            $scope.nextPage = function () {

                $scope.busy = true;
                var nextPage = response.paging.next;

                FacebookService.getMorePosts(nextPage).then(function (pagingResponse) {

                    response.paging = pagingResponse.paging;
                    k = $scope.posts.length;

                    for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                        
                        var activePoints = $.grep(Identity.currentUser.likes, function(e){ return e.id == pagingResponse.data[i].from.id; });
                        if(activePoints[0]) {
                            pagingResponse.data[i].activePoints = activePoints[0].points;
                        }
                            else {
                                pagingResponse.data[i].activePoints = 0;
                            }

                        if ( pagingResponse.data[i] ) {
                            $scope.posts.push( pagingResponse.data[i] );
                        }
                    }

                    if(pagingResponse.data.length != 0){
                        profileImageLoop();
                    }

                    $scope.busy = false;

                })
            }

            if (response.data.length <= 4) {

                $scope.nextPage();
            }

        });
    });
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

        $scope.commentWindow = function ( page ) {
            for ( var i = 0; i < data.length; i++ ) {
                if ( data[i] ) {
                    if ( data[i].id == page.id ) {
                        $scope.pages[i].wantToComment = true;
                        idComment = data[i].id;
                        idFrom = page.from.id;
                    }
                }
            }
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