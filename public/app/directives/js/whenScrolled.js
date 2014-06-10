app.directive('whenScrolled', function($window) {

    return function(scope, element, attr) {
        var scrolledEl = angular.element($window);
        
        angular.element($window).bind('scroll', function() {

		var offSet = scrolledEl.offset(),
			height = scrolledEl.height(),
			scrolledPercentage = (offSet / height)*11;

            if (scrolledPercentage >= 60) {
	          scope.$apply(attr.whenScrolled);
            }
        });
    };
});