app.controller('PostsController', function($scope, $rootScope, FacebookService){

	FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;
    });
	
    FacebookService.getPosts().then(function(data){
        console.log(data);
    });

});