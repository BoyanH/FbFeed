app.controller( 'PagesController', function ( $scope, Identity, Auth, UserResource, 
    $modal, $log, $rootScope, $sce, FacebookService, 
    ButtonsFacebookService, EmbedService, PopupService ) {

    $scope.stillLoding = true;
    var idComment, idFrom;

    FacebookService.getAuthData()
        .then( function ( data ) {
            $rootScope.user = data;
        })

    FacebookService.getPages().then( function ( data ) {

        var data = response.data;

        $scope.pageImages = [];
        $scope.pages = data;

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


        var pages = [];
        for ( var i = 0; i < data.length; i++ ) {
            if ( data[i] ) {
                pages.push( data[i] );
            }
        }
        data = pages;
        $scope.pages = data;

        var pages = [];
        for ( var i = 0; i < data.length; i++ ) {
            if ( data[i] ) {
                pages.push( data[i] );
            }
        }
        data = pages;
        $scope.pages = data;

        var k = 0;
        function profileImageLoop() {

            if ( data[k] ) {
                FacebookService.getPictureByID( data[k].from.id )
                    .then( function ( url ) {
                        $scope.pages[k++].profileImage = url;
                        if ( k < data.length ) {
                            setTimeout( profileImageLoop, 1 );
                        }
                    });

            }
        }
        if(data.length != 0){
            profileImageLoop();
        }

        for ( var t = 0; t < data.length; t++ ) {
            if ( data[t] && data[t].type == "photo" ) {

                $scope.pages[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
            }
        }

        $scope.stillLoding = false;
        console.log( data );

        $scope.trustSrc = function ( src ) {
            return $sce.trustAsResourceUrl( src );
        }

        for ( var z = 0; z < data.length; z++ ) {

            if ( data[z] && data[z].application ) {

                var type = data[z].application.name;
                if ( type == 'Video' || type == 'YouTube' ) {

                    $scope.pages[z] = EmbedService.normalizeLink( data[z] );
                }
            }

            else if ( data[z] && $scope.pages[z].type == 'video' ) {

                $scope.pages[z] = EmbedService.normalizeLink( $scope.pages[z] );
            }
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
        $scope.profilePicture = FacebookService.getUserProfilePicture();

        setTimeout( PopupService.init, 600 );
    });
        });
    $scope.modalShown = false;
    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.logStuff = function () {

        console.log('gosho');
    }
});