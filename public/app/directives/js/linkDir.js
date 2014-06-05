'use strict'
app.directive('linkDir', function () {
    return {
        restrict: 'AE',
        templateUrl: 'partials/directives/link',
        scope: {
            data: '=data'
        }
    }
});