app.factory("FacebookService", function ($location, $q) {
    FB.init({
        appId: '1480652358834115',
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        read_stream: true
    });
    console.log('FB initialized...');
    return {
        login: function () {
            /*FB.login(function(response){},
                        {scope:'user_status,read_stream,publish_stream,user_likes,publish_actions,read_friendlists,rsvp_event'});
                    console.log('Now logged in.');*/
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
                $location.path('/home');
            });
        },
        checkStatus: function () {
            FB.getLoginStatus(function (response) {
                return response.status;
            })
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