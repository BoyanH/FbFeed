app.factory("FacebookService", function ($location, $q) {
    FB.init({
        appId: '734082519946616',
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
                console.log(FB.getUserID());
                console.log(response);
                if (response.status === 'connected') {
                    console.log('Logged in.');
                }
                else {
                    FB.login(function(response){},
                        {scope:'user_status,read_stream,publish_stream,user_likes,publish_actions,read_friendlists,rsvp_event'});
                    console.log('Now logged in.');
                }
                deferred.resolve();
            });

            return deferred.promise;
        },
        getPages: function(){
            var deferred = $q.defer();
            FB.api(
                "/"+FB.getUserID()+"/likes",
                function ( response ) {
                    console.log("Response pages");
                    console.log(response);
                    if ( response && !response.error ) {
                        deferred.resolve(response);
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
                FB.api('/me', function(data){

                    deferred.resolve(data.first_name +' ' + data.last_name);
                })
            });
            
            return deferred.promise;
        },
        getPages: function(){
            var deferred = $q.defer();
            FB.api(
                "/me/home",
                function ( response ) {
                    console.log(response);
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
        }
    }
})