var app = angular.module('SuperCap', ['ngRoute', 'n3-line-chart','ui.bootstrap']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/main.html',
            controller: 'DataCtrl'
        });
});