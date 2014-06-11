app.controller('VideosController', function($scope, $sce, $rootScope, FacebookService, EmbedService, DateService,
    ButtonsFacebookService){
    var idComment, idFrom;
    $scope.stillLoding = true;

    FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;
        FacebookService.getVideos().then(function (response){
        
            var k = 0,
                data = response.data;

            $scope.videos = data;

            for (var i = 0; i < data.length; i++) {

                $scope.videos[i] = EmbedService.normalizeLink(data[i]);
                $scope.videos[i].updated_time = DateService.normalizeDate(data[i].updated_time)
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            function profileImageLoop() {
                FacebookService.getPictureByID(data[k].from.id)
                    .then(function (url) {

                        $scope.videos[k++].profileImage = url;
                        if (k < data.length) {
                            setTimeout(profileImageLoop, 1);
                        }
                    })
            }
            if (data.length) {
                profileImageLoop();
            }
                else {
                    $scope.stillLoding = false;
                }

            $scope.nextPage = function () {
console.log('next');
                $scope.busy = true;
                var nextPage = response.paging.next;

                FacebookService.getMoreVideos(nextPage).then(function (pagingResponse) {

                    response.paging = pagingResponse.paging;
                    k = $scope.videos.length;

                    for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                        if ( pagingResponse.data[i] ) {
                            $scope.videos.push( pagingResponse.data[i] );
                        }
                    }

                    if(pagingResponse.data.length != 0){
                        profileImageLoop();
                    }

                    $scope.busy = false;

                })
            }

            $scope.stillLoding = false;
            $scope.commentWindow = function ( video ) {
                for ( var i = 0; i < data.length; i++ ) {
                    if ( data[i] ) {
                        if ( data[i].id == video.id ) {
                            $scope.videos[i].wantToComment = true;
                            idComment = data[i].id;
                            idFrom = video.from.id;
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

            if (response.data.length <= 4) {

                $scope.nextPage();
            }

        });
    })


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

});