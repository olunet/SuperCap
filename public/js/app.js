var app = angular.module('SuperCap', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/main.html',
            controller: 'DataCtrl'
        });
});