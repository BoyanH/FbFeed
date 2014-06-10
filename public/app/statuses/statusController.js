app.controller('StatusController', function ($scope, $rootScope, FacebookService, ButtonsFacebookService){
    $scope.stillLoding = true;
    var idComment;

    FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;
        FacebookService.getStatuses().then(function (response){
        
            var data = response.data,
                k = 0;

            $scope.statuses = data;

            function profileImageLoop() {
                FacebookService.getPictureByID($scope.statuses[k].from.id)
                    .then(function (url) {
                        $scope.statuses[k].profileImage = url;
                        k++;
                        if (k < $scope.statuses.length) {
                            setTimeout(profileImageLoop, 1);
                        }
                    });
            }
            if(data.length != 0){
                profileImageLoop();
            }
            var p = 0;
            function addedPhoto() {
                FacebookService.getPictureByID($scope.statuses[p].object_id)
                    .then(function (url) {
                        $scope.statuses[p].addedPhoto = url;
                        while(data[p].status_type!="added_photos"){
                            p++;
                        }
                        if (p < $scope.statuses.length) {
                            setTimeout(addedPhoto, 1);
                        }
                    });
            }
            if(data.length != 0){
                addedPhoto();
            }

            $scope.nextPage = function () {

                $scope.busy = true;
                var nextPage = response.paging.next;

                FacebookService.getMorePosts(nextPage).then(function (pagingResponse) {

                    response.paging = pagingResponse.paging;
                    k = $scope.statuses.length;
                    p = $scope.statuses.length

                    for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                        if ( pagingResponse.data[i] ) {
                            $scope.statuses.push( pagingResponse.data[i] );
                        }
                    }

                    if(pagingResponse.data.length != 0){
                        profileImageLoop();
                        addedPhoto();
                    }

                    $scope.busy = false;

                })
            }

            for ( var t = 0; t < data.length; t++ ) {
                if ( data[t] && data[t].type == "photo" && data[t].status_type == "tagged_in_photo") {
                    $scope.statuses[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
                }
            }

            $scope.stillLoding = false;

            $scope.commentWindow = function ( page ) {
                for ( var i = 0; i < data.length; i++ ) {
                    if ( data[i] ) {
                        if ( data[i].id == page.id ) {
                            $scope.statuses[i].wantToComment = true;
                            idComment = data[i].id;
                        }
                    }
                }
            }
            $scope.profilePicture = FacebookService.getUserProfilePicture();
        });
    });
    $scope.share = function ( item ) {

        if(item.shares) {
            item.shares.count = item.shares.count + 1;
        }
        ButtonsFacebookService.share( item );
    }

    $scope.like = function ( item ) {

        ButtonsFacebookService.like( item );
    }
    $scope.comment = function(commentInput){
        var itemToComment = {};
        itemToComment.id = idComment;
        itemToComment.userMessage = commentInput.message
        ButtonsFacebookService.comment(itemToComment);
        $('.comment-input').val('');
    }
});