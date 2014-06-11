app.factory('Auth', function($http, $q, UserResource, Identity, FacebookService){
    return {
        login: function (user){
            var deferred = $q.defer();
            $http({ method: 'POST', data: user, url: '/login' }).success(function (response) {
                //console.log("reponse after post login");
                //console.log(response);
                if (response.success) {
                    var user =  new UserResource();
                    angular.extend(user, response.user);
                    Identity.currentUser = user;
                    console.log('User logged in');
                    deferred.resolve(response.user);
                }
                else{
                    $http({method: 'POST', data: user, url: '/api/users'}).success(function(response){
                        var user =  new UserResource();
                        angular.extend(user, response.user);
                        Identity.currentUser = user;
                        console.log('Created user and logged in');
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
        },
        update: function(user, id){
            var deferred = $q.defer(),
                checkHasIdInLikes = false;

            //search and add in users like the points

            //check if there is field with the provided id
            for(var i=0;i<user.likes.length;i++){
                if(user.likes[i].id === id){
                    user.likes[i].points++;
                    checkHasIdInLikes=true;
                }
            }
            // if there is no field with the id
            if(!checkHasIdInLikes){
                user.likes.push({id: id, points: 1});
            }

            var updatedUser = new UserResource(user);
            updatedUser.$update().then(function(){
                Identity.currentUser.likes = updatedUser.likes; 
                deferred.resolve(true);
            }, function(response){
                deferred.reject(response);
            })
            return deferred.promise;
        },
        isAuthenticated: function(){
            if(FacebookService.getStatusSync() == 'connected'){
                return true;
            }else{
                return $q.reject('not-authorized');
            }
        },
        notAuthenticated: function(){
            if(FacebookService.getStatusSync() == 'connected'){
                return $q.reject('authorized');
            }else{
                return true;
            }
        }
    }
});