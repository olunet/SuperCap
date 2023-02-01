angular.module('SuperCap').service('DataService', function ($http) {

    this.getAnions = function () {
        return $http({method: 'GET', url: './data/anions.json', cache: true});
      //  return $http({method: 'GET', url: '/api/anions', cache: true});
    };

    this.getCations = function () {
        return $http({method: 'GET', url: './data/cations.json', cache: true});
        //return $http({method: 'GET', url: '/api/cations', cache: true});
    };

    this.getElectrodes = function () {
        return $http({method: 'GET', url: './data/electrodes.json', cache: true});
        //return $http({method: 'GET', url: '/api/electrodes'});
    };

    this.getLiquids = function () {
        return $http({method: 'GET', url: './data/ionicliquids.json'}).then(data => {
          return Object.entries(data.data[0]).map(([id, obj]) => ({...obj, '_id': id}));
        }
        )
    };
});
