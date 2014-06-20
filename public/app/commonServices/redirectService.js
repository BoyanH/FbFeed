app.factory("RedirectService", function($rootScope, $location, $window, FacebookService){
	return {
		redirectConnected : function(){
			var refreshIntervalId = setInterval(function(){
				if(!FacebookService.loggedInRedirect && FacebookService.getStatusSync() == "connected"){

            		FacebookService.loggedInRedirect = true;
            		clearInterval(refreshIntervalId);
            		if($rootScope.history.length == 1){
            			$window.history.back();
            		}
            		else{
            			$location.path("/home");
            		}
        		}
			}, 100);
		}
	}
});