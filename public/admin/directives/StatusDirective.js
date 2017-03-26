angular.module('Angello.Admin').directive('status', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{status.name}}</h4></div>'
    };
});