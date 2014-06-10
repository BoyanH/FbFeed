app.controller('PostsController', function($scope, $rootScope, FacebookService, 
	ButtonsFacebookService, Auth, Identity){
	
	$scope.stillLoding = true;
	var idComment, idFrom;

	FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;

        FacebookService.getPosts().then(function(data){
            $scope.posts = data;
            console.log(data);
            var k = 0;
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
            if(data.length != 0){
                profileImageLoop();
            }
            $scope.stillLoding = false;
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


        $scope.showLikes = function ( item ) {

            window.open( '#/statuses', 'name', 'height=255,width=250, continued from previous line toolbar=no,directories=no,status=no,menubar=no, continued from previous line scrollbars=no,resizable=no' );
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