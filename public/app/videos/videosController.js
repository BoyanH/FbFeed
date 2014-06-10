app.controller('VideosController', function($scope, $sce, $rootScope, FacebookService, EmbedService, DateService,
    ButtonsFacebookService){
    var idComment, idFrom;
    $scope.stillLoding = true;

    FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;
        FacebookService.getVideos().then(function(data){
        
        var k = 0;

        console.log(data);

        $scope.allVideos = [];
        $scope.videos = data;
        $scope.allVideos = data;

        for (var i = 0; i < data.length; i++) {

            $scope.allVideos[i] = EmbedService.normalizeLink(data[i]);
            $scope.allVideos[i].updated_time = DateService.normalizeDate(data[i].updated_time)
        }

        //$scope.videos = $scope.allVideos.splice(0, 10);

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function go() {
            FacebookService.getPictureByID(data[k].from.id)
                .then(function (url) {

                    $scope.allVideos[k++].profileImage = url;
                    if (k < data.length) {
                        setTimeout(go, 1);
                    }
                })
        }
        if (data.length) {
            go();
        }
            else {
                $scope.stillLoding = false;
            }

        $scope.stillLoding = false;
        $scope.commentWindow = function ( video ) {
            for ( var i = 0; i < data.length; i++ ) {
                if ( data[i] ) {
                    if ( data[i].id == video.id ) {
                        $scope.allVideos[i].wantToComment = true;
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

    })
    .then(function (data) {

        $scope.changePage = function (page) {

            $scope.videos = $scope.allVideos.splice(page*10 - 10, page*10);
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