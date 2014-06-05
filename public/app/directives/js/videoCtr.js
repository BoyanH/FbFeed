app.controller('VideoController', function($scope, $sce){
	$scope.trustSrc = function ( src ) {
            return $sce.trustAsResourceUrl( src );
        }
});