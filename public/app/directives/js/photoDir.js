'use strict'
app.directive('photoDir', function () {
    return {
        restrict: 'AE',
        templateUrl: 'partials/directives/photo',
        controller: 'PhotoController',
        scope: {
            data: '=data'
        }
    }
});