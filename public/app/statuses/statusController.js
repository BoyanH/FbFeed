app.controller('StatusController', function ($scope, $rootScope, FacebookService, ButtonsFacebookService){
    $scope.stillLoding = true;
    var idComment;

    FacebookService.getAuthData()
    .then(function (data) {
        FacebookService.getUserProfilePicture();
        $rootScope.user = data;
        FacebookService.getStatuses().then(function (response){
            var k = 0;
            var data = response.data
            $scope.statuses = data;
            console.log(response.data);

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

                    for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                        if ( pagingResponse.data[i] ) {
                            $scope.statuses.push( pagingResponse.data[i] );
                        }
                    }

                    if(pagingResponse.data.length != 0){
                        for(;k<$scope.statuses.length;k++){
                            $scope.statuses[k].profileImage = "https://graph.facebook.com/" + 
                                $scope.statuses[k].from.id + "/picture";
                            if($scope.statuses[k].status_type=="added_photos"){
                                $scope.statuses[k].addedPhoto = "https://graph.facebook.com/" + 
                                    $scope.statuses[k].object_id + "/picture";
                            }

                        }
                    }

                    $scope.busy = false;

                })
            }

            for ( var t = 0; t < data.length; t++ ) {
                if ( data[t] && data[t].type == "photo" && data[t].status_type == "tagged_in_photo") {
                    $scope.statuses[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
                }
                if(data[t].type=="photo" && data[t].story){
                    if(data[t].story.indexOf("profile picture") > 0){
                        $scope.statuses[t].changedProfile = "https://graph.facebook.com/" + data[t].from.id + "/picture?type=large";
                    }
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
        var t=0;
        for(var t=0;t<data.length;t++){
            if(data[t].story){
                if(data[t].story.indexOf('likes a photo')>0){
                    $scope.statuses[t].likedPhoto = 'https://graph.facebook.com/' + 
                        data[t].id.slice(data[t].id.indexOf('_')+1,data[t].id.length) +
                        '/picture';
                }
            }
        }
        for ( var t = 0; t < data.length; t++ ) {
            if ( data[t] && data[t].type == "photo" ) {

                $scope.statuses[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
            }
        }
            $scope.profilePicture = FacebookService.getUserProfilePicture();

            if (response.data.length <= 4) {

                $scope.nextPage();
            }
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