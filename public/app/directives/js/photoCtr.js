app.controller('PhotoController', function($scope, $modal, $log){
	$scope.open = function(data){
		var modalInstance = $modal.open({
      		templateUrl: 'partials/modals/ModalContent',
      		controller: ModalInstanceCtrl,
      		resolve: {
        		url: function () {
          			return data.changedProfile || data.postPhoto || data.addedPhoto || data.likedPhoto;
        		}
      		}
    });

    modalInstance.result.then(function (result) {
      //do smth with the result 
    }, function () {
      		$log.info('Modal dismissed at: ' + new Date());
    	});
  	};
});