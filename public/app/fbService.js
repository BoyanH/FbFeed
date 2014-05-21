app.factory("FacebookService", function ($location) {
    FB.init({
        appId: '1480652358834115',
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true // parse XFBML
    });
    console.log('FB initialized...');
    return {
        login: function () {
            FB.getLoginStatus(function (response) {
                console.log(response);
                if (response.status === 'connected') {
                    console.log('Logged in.');
                }
                else {
                    FB.login();
                    console.log('Now logged in.');
                }
                $location.path('/home');
            });
        },
        checkStatus: function () {
            FB.getLoginStatus(function (response) {
                return response.status;
            })
        }
    }
})