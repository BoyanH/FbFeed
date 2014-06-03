app.controller('NotificationsController', function($scope, FacebookService, $rootScope){
    var notif = [];
    FacebookService.getAuthData()
    .then(function (data) {
        $rootScope.user = data;
    });

    var checkNotifications = setInterval(getNotifications, 15000);

    function getNotifications () {

    	FacebookService.getUserNotifications().then(function(response) {
            
	    });
    }

});