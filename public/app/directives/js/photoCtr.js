app.controller('PhotoController', function($scope, $modal, $log){
	$scope.open = function(data){
		var modalInstance = $modal.open({
      		templateUrl: 'partials/modals/ModalContent',
      		controller: ModalInstanceCtrl,
      		resolve: {
        		url: function () {
          			return data.postPhoto;
        		}
      		}
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      		$log.info('Modal dismissed at: ' + new Date());
    	});
  	};
});