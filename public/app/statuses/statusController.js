app.controller('StatusController', function ($scope, $rootScope, FacebookService, ButtonsFacebookService, Identity, Auth){
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
            console.log(data);
            //active Points appending loop
            for(var h = 0; h < data.length; h++) {
                if(Identity.currentUser)
                    var activePoints = $.grep(Identity.currentUser.likes, function(e){ return e.id == data[h].from.id; });
                if(activePoints[0]) {
                        $scope.statuses[h].activePoints = activePoints[0].points;
                    }
                        else {
                            $scope.statuses[h].activePoints = 0;
                        }
            }
            for(var p=0;p<data.length;p++){
                //profile image
                $scope.statuses[p].profileImage = "https://graph.facebook.com/" + data[p].from.id + "/picture";
                

                //comments
                if(data[p].comments){
                    for(var k=0;k<data[p].comments.data.length;k++){
                        data[p].comments.data[k].profilePicture = "https://graph.facebook.com/" + data[p].comments.data[k].from.id + "/picture";
                    }
                }
            }

            $scope.nextPage = function () {

                $scope.busy = true;
                var nextPage = response.paging.next;

                FacebookService.getMorePosts(nextPage).then(function (pagingResponse) {

                    response.paging = pagingResponse.paging;
                    k = $scope.statuses.length;

                    for ( var i = 0; i < pagingResponse.data.length; i++ ) {
                        
                        var activePoints = $.grep(Identity.currentUser.likes, function(e){ return e.id == pagingResponse.data[i].from.id; });
                        if(activePoints[0]) {
                            pagingResponse.data[i].activePoints = activePoints[0].points;
                        }
                            else {
                                pagingResponse.data[i].activePoints = 0;
                            }

                        if ( pagingResponse.data[i] ) {
                            $scope.statuses.push( pagingResponse.data[i] );
                        }
                    }

                    if(pagingResponse.data.length != 0){
                        for(;k<$scope.statuses.length;k++){
                            $scope.statuses[k].profileImage = "https://graph.facebook.com/" + 
                                $scope.statuses[k].from.id + "/picture";

                            if($scope.statuses[k].status_type=="added_photos"){
                                $scope.statuses[k].postPhoto = "https://graph.facebook.com/v1.0/" + 
                                    $scope.statuses[k].object_id + "/picture";
                                if(data[k].story && data[k].story.indexOf('profile picture') > 0){
                                    $scope.statuses[k].postPhoto = "https://graph.facebook.com/" + data[k].from.id + "/picture?width=9999&height=9999";
                                }
                            }
                            //comments
                            if($scope.statuses[k].comments){
                                for(var u=0;u<$scope.statuses[k].comments.data.length;u++){
                                    $scope.statuses[k].comments.data[u].profilePicture = "https://graph.facebook.com/" + $scope.statuses[k].comments.data[u].from.id + "/picture";
                                }
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
                        $scope.statuses[t].postPhoto = "https://graph.facebook.com/" + data[t].from.id + "/picture?type=large";
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
                    $scope.statuses[t].postPhoto = 'https://graph.facebook.com/' + 
                        data[t].id.slice(data[t].id.indexOf('_')+1,data[t].id.length) +
                        '/picture';
                }
            }
        }
        for ( var t = 0; t < data.length; t++ ) {
            if ( data[t] && data[t].type == "photo" ) {

                $scope.statuses[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
            }
            if(data[t].story && data[t].story.indexOf('profile picture') > 0){
                $scope.statuses[t].postPhoto = "https://graph.facebook.com/" + data[t].from.id + "/picture?width=9999&height=9999";
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
    $scope.comment = function(commentInput){
        var itemToComment = {};
        itemToComment.id = idComment;
        itemToComment.userMessage = commentInput.message
        ButtonsFacebookService.comment(itemToComment);
        $('.comment-input').val('');
    }
});