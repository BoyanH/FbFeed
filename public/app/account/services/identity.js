app.factory('Identity', function($window,UserResource){
	var user;
	if($window.bootstrappedUserObject){
        user = new UsersResource();
        angular.extend(user, $window.bootstrappedUserObject);
    }
	return{
        currentUser: user,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        update:function(){
            if($window.bootstrappedUserObject){
                user = new UsersResource();
                angular.extend(user, $window.bootstrappedUserObject);
            }
        }
    }
});