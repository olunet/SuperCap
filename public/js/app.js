var app = angular.module('VirtualBook', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/books.html',
            controller: 'BookCtrl'
        });
});