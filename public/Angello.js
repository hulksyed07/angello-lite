var myModule = angular.module('Angello',['ngRoute', 'Angello.Common', 'Angello.Storyboard']);


myModule.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'storyboard/tmpl/storyboard.html',
            controller: 'StoryboardCtrl',
            controllerAs: 'storyboard'
        })
        .otherwise({redirectTo: '/'});
});
