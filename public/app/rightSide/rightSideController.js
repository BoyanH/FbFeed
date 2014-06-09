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
	$scope.change = function(select){
		alert(select);
	}
});