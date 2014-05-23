app.controller('StatusController', function($scope, FacebookService){
    $scope.stillLoding = true;
    var idComment;
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
        item.shares.count = item.shares.count + 1;
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