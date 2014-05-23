app.controller('PagesController', function ($scope, $sce, FacebookService, ButtonsFacebookService, EmbedService) {
    
    $scope.stillLoding = true;
    
    FacebookService.getPages().then(function (data) {
        
        $scope.pageImages = [];
        $scope.pages = data;

        for(var z = 0; z < $scope.pages.length; z++) {

            if($scope.pages[z].application) {

                    var type = $scope.pages[z].application.name;
                    if(type == 'Video' || type == 'YouTube') {

                        $scope.pages[z] = EmbedService.normalizeLink($scope.pages[z]);
                    }
            }

            else if($scope.pages[z].type == 'video') {

                $scope.pages[z] = EmbedService.normalizeLink($scope.pages[z]);
            }
        }

        var k = 0;
        function profileImageLoop() {

        var pages = [];
        for(var i=0;i<data.length;i++){
            if(data[i]){
                pages.push(data[i]);
            }
        }
        data = pages;
        $scope.pages = data;

        var k = 0;
        function profileImageLoop() {
            
            if(data[k]){
            FacebookService.getPictureByID(data[k].from.id)
                .then(function (url) {
                    $scope.pages[k++].profileImage = url;
                    if (k < data.length) {
                        setTimeout(profileImageLoop, 1);
                    }
                });

        }
        profileImageLoop();
        for (var t = 0; t < data.length; t++) {
            if(data[t].type=="photo") {

            }
            else{
                if(k<data.length){
                    k++;
                    setTimeout(profileImageLoop, 1);
                }
            }
        }
        profileImageLoop();
        for (var t = 0; t < data.length; t++) {
            if(data[t] && data[t].type=="photo") {

                $scope.pages[t].postPhoto = "https://graph.facebook.com/" + data[t].object_id + "/picture";
            }
        }

        $scope.stillLoding = false;
        console.log(data);

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        for(var z = 0; z < data.length; z++) {

            if(data[z] && data[z].application) {

                    var type = data[z].application.name;
                    if(type == 'Video' || type == 'YouTube') {
                        console.log(EmbedService.normalizeLink(data[z]));
                        $scope.pages[z] = EmbedService.normalizeLink(data[z]);
                    }
            }

            else if(data[z] && $scope.pages[z].type == 'video') {

                $scope.pages[z] = EmbedService.normalizeLink($scope.pages[z]);
            }
        }

    });

    $scope.share = function (item) {

        ButtonsFacebookService.share(item);
    }

    $scope.like = function (item) {
        
        ButtonsFacebookService.like(item);
    }

});