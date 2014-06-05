app.factory('Auth', function($http, $q){
    return {
        login: function (user){
            var deferred = $q.defer();
            $http({ method: 'POST', data: user, url: '/login' }).success(function (response) {
                console.log("reponse after post login");
                console.log(response);
                if (response.success) {
                    console.log(response);
                    console.log('User logged in');
                    deferred.resolve(response.user);
                }
                else{
                    $http({method: 'POST', data: user, url: '/api/users'}).success(function(response){
                        console.log("User created, Response - ");
                        console.log(response);
                        deferred.resolve(response.user);
                    }).error(function(response){
                        deferred.resolve(false);
                    });
                }
                
            }).error(function (data) {
                console.log('Error login: ' + data);
                deferred.resolve(false);
            });
            return deferred.promise;
        }
    }
});