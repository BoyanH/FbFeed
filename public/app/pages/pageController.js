app.controller( 'PagesController', function ( $scope, Identity, Auth, UserResource, 
    $modal, $log, $rootScope, $sce, FacebookService, 
    ButtonsFacebookService, EmbedService, PopupService ) {

    $scope.stillLoding = true;
    var idComment, idFrom;

    FacebookService.getAuthData()
        .then( function ( data ) {
            $rootScope.user = data;
        });

    FacebookService.getPages().then( function ( response ) {

        var data = response.data;

        $scope.pageImages = [];
        $scope.pages = data;
        $scope.stillLoding = false;
        console.log(data);
        $scope.profilePicture = FacebookService.getUserProfilePicture();

        for ( var z = 0; z < $scope.pages.length; z++ ) {

            if ( $scope.pages[z].application ) {

                var type = $scope.pages[z].application.name;
                if ( type == 'Video' || type == 'YouTube' ) {

                    $scope.pages[z] = EmbedService.normalizeLink( $scope.pages[z] );
                }
            }

            else if ( $scope.pages[z].type == 'video' ) {

                $scope.pages[z] = EmbedService.normalizeLink( $scope.pages[z] );
            }
        }

        for ( var t = 0; t < data.length; t++ ) {
            
            //active Points
            var activePoints = $.grep(Identity.currentUser.likes, function(e){ return e.id == data[t].from.id; });
            if(activePoints[0]) {
                    $scope.pages[t].activePoints = activePoints[0].points;
                }
                    else {
                        $scope.pages[t].activePoints = 0;
                    }

            //profile image
            $scope.pages[t].profileImage = "https://graph.facebook.com/" + data[t].from.id + "/picture";

            //type photo post
            if ( data[t] && data[t].type == "photo" ) {

                $scope.pages[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
            }
            //type video post
            if ( data[t] && data[t].application ) {

                var type = data[t].application.name;
                if ( type == 'Video' || type == 'YouTube' ) {

                    $scope.pages[t] = EmbedService.normalizeLink( data[t] );
                }
            }

            else if ( data[t] && $scope.pages[t].type == 'video' ) {

                $scope.pages[t] = EmbedService.normalizeLink( $scope.pages[t] );
            }

            //comments
            if(data[t].comments){
                for(var k=0;k<data[t].comments.data.length;k++){
                    data[t].comments.data[k].profilePicture = "https://graph.facebook.com/" + data[t].comments.data[k].from.id + "/picture";
                }
            }
        }

        $scope.trustSrc = function ( src ) {
            return $sce.trustAsResourceUrl( src );
        }

        $scope.nextPage = function () {

            $scope.busy = true;
            var nextPage = response.paging.next;

            FacebookService.getMorePages(nextPage).then(function (pagingResponse) {

                response.paging = pagingResponse.paging;
                k = $scope.pages.length;

                for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                    if(Identity.currentUser)
                        var activePoints = $.grep(Identity.currentUser.likes, function(e){ return e.id == pagingResponse.data[i].from.id; });
                    if(activePoints[0]) {
                        pagingResponse.data[i].activePoints = activePoints[0].points;
                    }
                        else {
                            pagingResponse.data[i].activePoints = 0;
                        }

                    if (pagingResponse.data[i] ) {
                        $scope.pages.push( pagingResponse.data[i] );
                    }
                }

                if(pagingResponse.data.length != 0){
                    for(;k<$scope.pages.length;k++){
                            $scope.pages[k].profileImage = "https://graph.facebook.com/" + 
                                $scope.pages[k].from.id + "/picture";
                            if($scope.pages[k].type=="photo")
                                $scope.pages[k].postPhoto = "https://graph.facebook.com/" + $scope.pages[k].object_id + "/picture";
                            //comments
                            if($scope.pages[k].comments){
                                for(var u=0;u<$scope.pages[k].comments.data.length;u++){
                                    $scope.pages[k].comments.data[u].profilePicture = "https://graph.facebook.com/" + $scope.pages[k].comments.data[u].from.id + "/picture";
                                }
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

        $scope.commentWindow = function ( page ) {
            
            $scope.pages[page].wantToComment = true;
            $scope.pages[page].showComments = true;
            idComment = data[page].id;
            idFrom = $scope.pages[page].from.id;
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

        setTimeout( PopupService.init, 600 );

        if (response.data.length <= 4) {

            $scope.nextPage();
        }

    });
    
    $scope.modalShown = false;
    
    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.showComments = function (page) {
        console.log('showing');
        $scope.pages[page].showComments = true;
        $scope.pages[page].wantToComment = true;
        console.log($scope.pages[page]);
    }

});