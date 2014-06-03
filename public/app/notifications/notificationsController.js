app.controller('NotificationsController', function($scope, FacebookService, $rootScope){

    var checkNotifications = setInterval(getNotifications, 2000);

    function getNotifications () {

    	FacebookService.getUserNotifications().then(function(response) {

	    	$scope.notifications = response.data;
            console.log(response.data);
	    });

    }

    $scope.markAsRead = function (item) {

        FacebookService.deleteNotification(item);
    }
    

});