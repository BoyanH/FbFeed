app.controller('PostsController', function($scope, $rootScope, FacebookService, 
	ButtonsFacebookService, Auth, Identity){
	
	$scope.stillLoding = true;
	var idComment, idFrom;

	FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;

        FacebookService.getPosts().then(function (response){
            $scope.profilePicture = FacebookService.getUserProfilePicture();

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
                //comments
                if(data[h].comments){
                    for(var k=0;k<data[h].comments.data.length;k++){
                        data[h].comments.data[k].profilePicture = "https://graph.facebook.com/" + data[h].comments.data[k].from.id + "/picture";
                    }
                }
                data[h].profileImage = "https://graph.facebook.com/" + data[h].from.id + '/picture';
            }
            $scope.stillLoding = false;

            $scope.nextPage = function () {

                $scope.busy = true;
                var nextPage = response.paging.next;

                FacebookService.getMorePosts(nextPage).then(function (pagingResponse) {

                    response.paging = pagingResponse.paging;
                    k = $scope.posts.length;

                    for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                        pagingResponse.data[i].profileImage = "https://graph.facebook.com/" + pagingResponse.data[i].from.id + '/picture';
                        if(Identity.currentUser)
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
                        //comments
                        if(pagingResponse.data[i].comments){
                            for(var k=0;k<pagingResponse.data[i].comments.data.length;k++){
                                pagingResponse.data[i].comments.data[k].profilePicture = "https://graph.facebook.com/" + pagingResponse.data[i].comments.data[k].from.id + "/picture";
                            }
                        }
                    }

                    $scope.busy = false;

                })
            }

            if (response.data.length <= 4) {

                $scope.nextPage();
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

            $scope.like = function ( item, index ) {
                ButtonsFacebookService.like( item ).then(function(success){
                    if(success){
                        Auth.update(Identity.currentUser, item.from.id).then(function(success){
                            $("#like-"+index).addClass("liked");
                        });
                    }
                    else{
                        alert("Problem with likeing post!");
                    }
                });
            }

        $scope.commentWindow = function ( post ) {
            for(var i=0;i<$scope.posts.length;i++){
                if(post.id == data[i].id){
                    $scope.posts[i].wantToComment = true;
                    idComment=data[i].id;
                    idFrom = data[i].from.id
                    break;
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
    });
    

});