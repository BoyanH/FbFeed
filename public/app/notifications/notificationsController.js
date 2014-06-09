app.controller('NotificationsController', function($scope, $location, $routeParams, $rootScope, FacebookService){

    FacebookService.getAuthData()
        .then( function ( data ) {
            $rootScope.user = data;
        })

    //ON EVERY ROUTE OF THE SINGLE PAGE APPLICATION

    var updateNotificationsInterval = setInterval(getNotifications, 2000),
        notifications;

    function getNotifications () {

    	FacebookService.getUserNotifications().then(function(response) {
            if(response.data){
            if($scope.notifications) {

                if($scope.notifications.forEach(function(item) { if(!item.profileImage) return true})) {

                    var k = 0;
                    $scope.notifications = response.data;
                    notifications = response.data;
                    profileImageLoop();
                }
            }
                else{

                    var k = 0;
                    $scope.notifications = response.data;
                    notifications = response.data;
                    profileImageLoop();
                }

            function profileImageLoop() {

                if ( response && response.data && response.data[k] ) {
                    FacebookService.getPictureByID( response.data[k].from.id )
                        .then( function ( url ) {
                            $scope.notifications[k++].profileImage = url;
                            if ( k < response.data.length ) {
                                setTimeout( profileImageLoop, 1 );
                            }
                        });

                }
            }
        }
	    });

    }

    $scope.goToNotif = function (notifId) {

        $location.path('/notifications/' + notifId);
    }

    //IF ROUTE IS /notifications/:notificationId AND A NOTIFICATION MUST BE VISUALISED

    if($routeParams.notificationId) {

        // FacebookService.deleteNotification($routeParams.notificationId); //Leave it like this for now, notifications are hard to get
            FacebookService.getUserNotifications().then(function(response) {

                $scope.crntNotif = $.grep(response.data, function(e){ return e.id == $routeParams.notificationId; });

                if($scope.crntNotif.object) {
                    $scope.crntNotif = $scope.crntNotif.object;
                }
            });

            FacebookService.getPostById($routeParams.notificationId).then(function(response) {

                console.log(JSON.stringify(response));
            });
        
    }
    

});