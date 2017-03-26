var myModule = angular.module('Angello',['ngRoute', 'Angello.Common', 'Angello.Storyboard', 'Angello.Admin']);


myModule.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'storyboard/tmpl/storyboard.html',
            controller: 'StoryboardCtrl',
            controllerAs: 'storyboard'
        })
        .when('/statuses',{
        	templateUrl: 'admin/tmpl/status.html',
        	controller: 'StatusController',
        	controllerAs: 'statusCtrl'
        })
        .otherwise({redirectTo: '/'});
});
