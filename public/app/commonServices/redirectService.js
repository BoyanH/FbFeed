app.factory("RedirectService", function($rootScope, $location, $window, FacebookService, Auth, Identity){
	return {
		redirectConnected : function(){
			var refreshIntervalId = setInterval(function(){
				if(!FacebookService.loggedInRedirect && FacebookService.getStatusSync() == "connected"){

            		FacebookService.loggedInRedirect = true;
            		clearInterval(refreshIntervalId);
                    FacebookService.getAuthData()
                        .then(function(data){
                            $rootScope.user = data;
                            var user = {};
                            user.username = data.id;
                            user.password = 'random';
                            user.likes = [];
                            Auth.login(user).then(function(user){
                                Identity.currentUser = user;
                            }).then(function(){
                                if($rootScope.history.length == 1){
                                    $window.history.back();
                                }
                                else{
                                    $location.path("/home");
                                }
                            });
                            
                        })
        		}
			}, 100);
		}
	}
});