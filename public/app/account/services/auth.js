app.factory('Auth', function($http, $q){
    return {
        login: function (user){
            var deferred = $q.defer();
            $http.post('/login', user).success(function(response){
                if(response.success){
                    //var user = new UsersResource();
                    angular.extend(user, response.user);
                    //identity.currentUser = user;
                    deferred.resolve(true);
                    //console.log(response.user);
                }
                else {
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        }
    }
});