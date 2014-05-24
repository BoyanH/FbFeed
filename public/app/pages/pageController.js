app.controller( 'PagesController', function ( $scope, $sce, FacebookService, ButtonsFacebookService, EmbedService ) {

    $scope.stillLoding = true;
    var idComment;
    FacebookService.getPages().then( function ( data ) {
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
        profileImageLoop();

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
                    console.log( EmbedService.normalizeLink( data[z] ) );
                    $scope.pages[z] = EmbedService.normalizeLink( data[z] );
                }
            }

            else if ( data[z] && $scope.pages[z].type == 'video' ) {

                $scope.pages[z] = EmbedService.normalizeLink( $scope.pages[z] );
            }
        }
        $scope.share = function ( item ) {

            if(item.shares) {
                item.shares.count = item.shares.count + 1;
            }
            ButtonsFacebookService.share( item );
        }

        $scope.like = function ( item ) {

            ButtonsFacebookService.like( item );
        }

        $scope.commentWindow = function ( page ) {
            for ( var i = 0; i < data.length; i++ ) {
                if ( data[i] ) {
                    if ( data[i].id == page.id ) {
                        $scope.pages[i].wantToComment = true;
                        idComment = data[i].id;
                    }
                }
            }
        }
        $scope.comment = function(commentInput){
            var itemToComment = {};
            itemToComment.id = idComment;
            itemToComment.userMessage = commentInput.message
            ButtonsFacebookService.comment(itemToComment);
            $('.comment-input').val('');
        }
    });
    $scope.profilePicture = FacebookService.getUserProfilePicture();
});