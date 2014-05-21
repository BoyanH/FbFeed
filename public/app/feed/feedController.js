app.controller('FeedController', function($scope, $rootScope, FacebookService){
    
    FacebookService.checkStatus()
    	.then(function (data) {
    		console.log('Login status: ' + data);
    	});

	FacebookService.getAuthData()
			.then(function (data) {
				$rootScope.user = data;
			})

});