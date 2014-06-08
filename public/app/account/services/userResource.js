app.factory('UserResource', function($resource){
	var UsersResource = $resource('/api/users/:id', {_id:'@id'}, {update: { method:'PUT', isArray: false } } );
	return UsersResource;
});