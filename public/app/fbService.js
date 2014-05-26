app.factory("FacebookService", function ($location, $q) {
    var id = "734082519946616",
        limit = '300',
        uid,
        accessToken,
        userProfilePicture;
    FB.init({
        appId: id,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        read_stream: true
    });
    console.log('FB initialized...');
    
    return {
        login: function () {
            var deferred = $q.defer();

            FB.getLoginStatus(function (response) {

                if (response.status === 'connected') {
                    console.log('Logged in.');
                    console.log(response);

                    uid = response.authResponse.userID;
                    accessToken =  response.authResponse.accessToken;
                }
                else {
                    FB.login(function(response){},
                        {scope:'user_status,read_stream,publish_stream,user_likes,publish_actions,read_friendlists,rsvp_event'});
                    console.log('Now logged in.');
                }
                deferred.resolve();
            });
            FB.api(
                "/me/picture",
                function (response) {
                    console.log(response.data);
                    if (response && !response.error) {
                        userProfilePicture=response.data.url;
                    }
                }  
            );

            return deferred.promise;
        },
        checkStatus: function () {
           var deferred = $q.defer();
            FB.getLoginStatus(
                function ( response ) {
                    deferred.resolve(response.status);
                }
            );
            return deferred.promise;
        },
        getAuthData: function () {
            var deferred = $q.defer();

            FB.getLoginStatus(function (response) {
                FB.api('/me',

                function(data){

                    deferred.resolve(data);
                })
            });
            
            return deferred.promise;
        },
        getPages: function(){
            var deferred = $q.defer();
            FB.api(
                '/me/home/', {since:'yesterday','limit': limit},
                function ( response ) {

                    if ( response && !response.error ) {
                        var pages = [];
                        for(var i =0;i<response.data.length; i++){
                            if(response.data[i].from.category){
                                pages.push(response.data[i]);
                            }
                        }
                        deferred.resolve(pages);
                    }
                }
            );
            return deferred.promise;
        },
        getFeed: function () {

            var deferred = $q.defer();

            FB.api(
                '/me/home/', {since:'yesterday','limit': limit},
                function (response) {
                    if (response && !response.error) {

                        deferred.resolve(response);
                    }

                }

            );
            return deferred.promise;
        },
        getStatuses: function() {
            var deferred = $q.defer();
            console.log(uid);
            FB.api(
                '/me/home/', {since:'yesterday','limit': limit},
                function ( response ) {

                    if ( response && !response.error ) {

                        var statuses = [];

                        for (var i = 0; i < response.data.length; i++) {

                            if(response.data[i].comments) {

                                if (response.data[i].comments.data[0].can_remove !== undefined) {

                                    if (!response.data[i].from.category) {
                                        statuses.push(response.data[i]);
                                    }
                                }
                            }
                            else if(response.data[i].place) {
                                
                                if (!response.data[i].from.category) {
                                    statuses.push(response.data[i]);
                                }
                            }
                        }
                        deferred.resolve(statuses);
                    }
                }
            );
            return deferred.promise;  
        },
        getPosts: function() {
            var deferred = $q.defer();
            FB.api(
                "/me/home", {since:'yesterday','limit': limit},
                function ( response ) {
                    if ( response && !response.error ) {

                        var posts = [];
                        for(var i = 0; i < response.data.length; i++) {

                            if (response.data[i].story || response.data[i].status_type == 'shared_story') {

                                posts.push(response.data[i]);
                            }
                        }
                        deferred.resolve(posts);
                    }
                }
            );
            return deferred.promise;  
        },
        getVideos: function() {
            var deferred = $q.defer(),
                videos = []
            FB.api(
                '/me/home/', {since:'yesterday','limit': limit},
                function ( response ) {

                    if ( response && !response.error ) {

                        for(var i = 0; i < response.data.length; i++) {

                            if(response.data[i].application) {

                                    var type = response.data[i].application.name;
                                    if(type == 'Video' || type == 'YouTube') {

                                        videos.push(response.data[i]);
                                    }
                            }

                            else if(response.data[i].type == 'video') {

                                videos.push(response.data[i]);
                            }
                        }
                        deferred.resolve(videos);
                    }
                }
            );
            return deferred.promise;  
        },
        getAppID: function(){
            return id;
        },
        getPictureByID: function(id){
            var deferred = $q.defer();
            FB.api(
                "/" + id +  "/picture",
                function (response) {
                    if (response && !response.error) {
                        deferred.resolve(response.data.url);
                    }
                }  
            );
            return deferred.promise;
        },
        getUserProfilePicture: function(){
            return userProfilePicture;
        }
    }
})