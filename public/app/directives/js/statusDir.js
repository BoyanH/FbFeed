'use strict'
app.directive('statusDir', function () {
    return {
        restrict: 'AE',
        templateUrl: 'partials/directives/status',
        scope: {
            data: '=data'
        }
    }
});