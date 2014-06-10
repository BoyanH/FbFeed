app.factory("FacebookService", function ($location, $q) {
    var id = "1480652358834115",
        limit = '20',
        uid, //user's id
        accessToken,
        userProfilePicture,
        since = 'last week';
    FB.init({
        appId: id,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        read_stream: true,
        manage_notifications: true,
        user_groups: true

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
                    alert('dsadasdasdadsa');
                    FB.login(function(response){},
                        {scope:'user_status,user_photos,read_stream,publish_stream,user_likes,publish_actions,read_friendlists,manage_notifications,rsvp_event,user_groups,user_events'});
                    console.log('Now logged in.');
                }
                FB.api(
                    "/me/picture",
                    function (response) {
                        console.log(response.data);
                        if (response && !response.error) {
                            userProfilePicture=response.data.url;
                            deferred.resolve();
                        }
                    }  
                );
            });
            

            return deferred.promise;
        },
        logout: function(){
            FB.logout();
        },
        checkStatus: function () {
           var deferred = $q.defer();
            FB.getLoginStatus(
                function ( response ) {
                    if(response.status=="connected"){
                        uid = response.authResponse.userID;
                        accessToken =  response.authResponse.accessToken;

                        deferred.resolve(response.status);
                    }
                    else{
                        deferred.resolve(false);
                    }
                }
            );
            return deferred.promise;
        },
        getAuthData: function () {
            var deferred = $q.defer();

            FB.getLoginStatus(function (response) {
                if(response.status=="connected"){
                    uid = response.authResponse.userID;
                    accessToken =  response.authResponse.accessToken;
                
                    FB.api('/me',
                    function(data){
                        deferred.resolve(data);
                    });
                }else{
                    deferred.reject();
                }
            });
            
            return deferred.promise;
        },
        getPages: function(){
            var deferred = $q.defer();
            FB.api(
                '/me/home/', {since: since,'limit': limit},
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
                '/me/home/', {since: since,'limit': limit},
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
                '/me/home/', {since: since,'limit': limit},
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
                "/me/home", {since: since,'limit': limit},
                function ( response ) {
                    if ( response && !response.error ) {

                        var posts = [];
                        for(var i = 0; i < response.data.length; i++) {

                            if ((response.data[i].status_type == "mobile_status_update" && response.data[i].type!='photo')
                                || (response.data[i].status_type == 'shared_story' &&
                                        (response.data[i].type == 'video' || response.data[i].type=='link')
                                    )
                                ) {

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
                '/me/home/', {since: since,'limit': limit},
                function ( response ) {

                    if ( response && !response.error ) {

                        for(var i = 0; i < response.data.length; i++) {

                            if(response.data[i].application) {

                                    var type = response.data[i].application.name;
                                    if((type == 'Video' || type == 'YouTube') && (response.data[i].source || response.data[i].link)) {

                                        videos.push(response.data[i]);
                                    }
                            }

                            else if(response.data[i].type == 'video') {

                                videos.push(response.data[i]);
                            }
                        }
                        console.log(videos);
                        deferred.resolve(videos);
                    }
                }
            );
            return deferred.promise;  
        },
        getPostById: function (id) {
            var deferred = $q.defer();

            FB.api(
                '/' + id,
                function (response) {
                  if (response && !response.error) {
                    deferred.resolve(response);
                  }
                    else {
                        console.error("Error querying post by id: " + response.error);
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
        getUserNotifications: function () {

            var deferred = $q.defer();
            FB.api(
                "/me/notifications", {'since':'last week','limit': limit},
                function (response) {
                    deferred.resolve(response);
                }  
            );
            return deferred.promise;
        },
        getUserProfilePicture: function(){
            return userProfilePicture || FB.api(
                "/me/picture",
                function (response) {
                    console.log(response.data);
                    if (response && !response.error) {
                        userProfilePicture=response.data.url;
                    }
                }  
            );
        },
        deleteNotification: function (item) {

            var deferred = $q.defer();

            FB.api(
                'https://graph.facebook.com/' + item, 'post',
                { unread: 0 },
                function(response) {
                    if (!response || response.error) {
                        console.error('------------------------------------------');
                        console.error('Error occured while marking notification as read');
                        console.error(response.error);
                        console.error('------------------------------------------');
                    } else {
                        deferred.resolve(response);
                    }
                });
            return deferred.promise;
        },
        getEventById: function(id){
            var deferred = $q.defer();

            FB.api(
                '/' + id,
                function (response) {
                  if (response && !response.error) {
                    deferred.resolve(response);
                  }
                    else {
                        console.error("Error querying event with id: " + response.error);
                    }
                }
            );
            return deferred.promise;
        },
        postStatusToMyWall: function(messageUser){
            var deferred = $q.defer();
            console.log('fbID: ' + Identity.currentUser.fbID);
            FB.api(
                '/me/feed',
                "post", { message: messageUser },
                function(response){
                    console.log(response);
                    deferred.resolve(response);
                }
            );

            return deferred.promise;
        }
    }
})