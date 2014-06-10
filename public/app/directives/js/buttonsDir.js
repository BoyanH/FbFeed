'use strict'
app.directive('photoDir', function () {
    return {
        restrict: 'AE',
        templateUrl: 'partials/directives/buttons',
        controller: 'ButtonsController',
        scope: {
            data: '=data'
        }
    }
});