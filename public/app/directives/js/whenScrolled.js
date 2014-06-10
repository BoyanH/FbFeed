app.directive('whenScrolled', function($window) {

    return function(scope, element, attr) {
        var scrolledEl = angular.element($window);
        
        angular.element($window).bind('scroll', function() {

	    var offSet = $window.pageYOffset,
	        height = $window.innerHeight,
	        scrolledPercentage = (offSet / height * 100);
console.log(scrolledPercentage);
	        if (scrolledPercentage >= attr.percent) {
	          scope.$apply(attr.whenScrolled);
	          console.log('jaja');
	        }
	    });
    };
});