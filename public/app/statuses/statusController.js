app.controller('StatusController', function ($scope, $rootScope, FacebookService, ButtonsFacebookService){
    $scope.stillLoding = true;
    var idComment;

    FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;
    })
    
    FacebookService.getStatuses().then(function(data){
        
        console.log(data);
        $scope.allStatuses = data;
        
        var k = 0;
        function profileImageLoop() {
            FacebookService.getPictureByID($scope.allStatuses[k].from.id)
                .then(function (url) {
                    $scope.allStatuses[k].profileImage = url;
                    k++;
                    if (k < $scope.allStatuses.length) {
                        setTimeout(profileImageLoop, 1);
                    }
                });
        }
        if(data.length != 0){
            profileImageLoop();
        }
        var p = 0;
        function addedPhoto() {
            FacebookService.getPictureByID($scope.allStatuses[p].object_id)
                .then(function (url) {
                    $scope.allStatuses[p].addedPhoto = url;
                    while(data[p].status_type!="added_photos"){
                        p++;
                    }
                    if (p < $scope.allStatuses.length) {
                        setTimeout(addedPhoto, 1);
                    }
                });
        }
        if(data.length != 0){
            addedPhoto();
        }
        for ( var t = 0; t < data.length; t++ ) {
            if ( data[t] && data[t].type == "photo" && data[t].status_type == "tagged_in_photo") {
                $scope.allStatuses[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
            }
        }

        //$scope.statuses = $scope.allStatuses.splice(0, 10);
        $scope.stillLoding = false;

        $scope.commentWindow = function ( page ) {
            for ( var i = 0; i < data.length; i++ ) {
                if ( data[i] ) {
                    if ( data[i].id == page.id ) {
                        $scope.allStatuses[i].wantToComment = true;
                        idComment = data[i].id;
                    }
                }
            }
        }
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
    $scope.profilePicture = FacebookService.getUserProfilePicture();
    $scope.changePage = function (page) {

    	//$scope.statuses = $scope.allStatuses.splice(0, page*10);
    }
});