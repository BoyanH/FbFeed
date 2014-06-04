var ModalInstanceCtrl = function ($scope, $modalInstance, url) {

  $scope.url = url;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};