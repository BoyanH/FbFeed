app.controller('RightSideController', function($scope, FacebookService, Identity, $rootScope){
	$scope.user = $rootScope.user;
	$scope.updateStatus = function(message){
		
		FacebookService.postStatusToMyWall(message).then(function(response){
			if(response.error){
				alert('Couldnt post on your wall :(');
			}else{
				$('#message').val('');
			}
		});
	}

	//What to order by
    $scope.change = function (select) {

        if(select == 'points') {
            $rootScope.orderBy = '';
        }
            else {
                $rootScope.orderBy = 'activePoints';
            }

    }
    //End of order by
});