'use strict'
app.directive('videoDir', function () {
    return {
        restrict: 'AE',
        templateUrl: 'partials/directives/video',
        controller: 'VideoController',
        scope: {
            data: '=data'
        }
    }
});