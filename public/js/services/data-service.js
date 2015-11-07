angular.module('SuperCap').service('DataService', function ($http) {

    this.getAnions = function () {
        return $http({method: 'GET', url: '/api/anions'});
    };

    this.getCations = function () {
        return $http({method: 'GET', url: '/api/cations'});
    };

    this.getElectrodes = function () {
        return $http({method: 'GET', url: '/api/electrodes'});
    };

    this.getLiquids = function () {
        return $http({method: 'GET', url: '/api/liquids'});
    };
});