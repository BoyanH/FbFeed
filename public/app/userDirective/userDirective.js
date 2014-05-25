'use strict';

app.directive('userDirective', function() {
    return {
        restrict: 'A',
        template: '<a class="user-acc" href="{{user.link}}" target="_blank">{{user.first_name}} {{user.last_name}}</a>'
    }
})