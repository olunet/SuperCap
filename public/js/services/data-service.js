angular.module('SuperCap').service('DataService', function ($http) {

    this.getAnions = function () {
        return $http({method: 'GET', url: '/api/anions', cache: true});
    };

    this.getCations = function () {
        return $http({method: 'GET', url: '/api/cations', cache: true});
    };

    this.getElectrodes = function () {
        return $http({method: 'GET', url: '/api/electrodes'});
    };

    this.getLiquids = function () {
        return $http({method: 'GET', url: '/api/liquids'});
    };
});