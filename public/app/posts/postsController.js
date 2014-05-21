app.controller('PostsController', function($scope, FacebookService){
    FacebookService.getPosts().then(function(data){
        console.log(data);
    });
});