app.controller('PagesController', function($scope, FacebookService){
    FacebookService.getPages().then(function(data){
        console.log(data.data.length);
        for(var i=0;i<data.data.length;i++){
            console.log(data[i]);
        }
    });
});