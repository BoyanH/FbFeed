app.controller('MainController', function($scope, $rootScope, $location, FacebookService, Auth, Identity, RedirectService){
    FacebookService.checkStatus().then(function(data){
        if(data == "connected")
            RedirectService.redirectConnected();//redirectif the user is already connected
    });
    $scope.login = function(){
        
        FacebookService.login()
         .then(function (data) {
         	FacebookService.getAuthData()
				.then(function (data) {
                    console.log(data);
					$rootScope.user = data;
                    var user = {};
                    user.username = data.id;
                    user.password = 'random';
                    //user.likes = [];
                    Auth.login(user).then(function(user){
                        Identity.currentUser = user;
                    }).then(function(){
                        $location.path('/home');
                    });
				})
				.then(function () {
					$location.path('/home');
                    //FacebookService.logout();
				});
         });

     }

 });