app.controller('PagesController', function($scope, FacebookService){
    FacebookService.getPages().then(function(data){
        console.log(data);
    });
});