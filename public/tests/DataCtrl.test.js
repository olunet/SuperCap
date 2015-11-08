/* global expect, jasmine */

describe('DataCtrl tests', function () {
    // Mocked DataService
    angular.module('DataCtrl', []).
            factory('DataService', function ($q) {
                var DataService = {};
                // example stub methods that return a promise, e.g. if original method returned $http.get(...)
                DataService.getAnions = function () {
                    return $q.when("");
                };
                DataService.getCations = function () {
                    return $q.when("");
                };
                DataService.getElectrodes = function () {
                    return $q.when("");
                };
                DataService.getLiquids = function () {
                    return $q.when("");
                };
                return DataService;
            });

    beforeEach(function () {
        angular.mock.module('SuperCap');
        angular.mock.module('DataCtrl');

    });
    beforeEach(inject(function ($controller, $rootScope, _DataService_) { // inject mocked service
        this.scope = $rootScope.$new();
        this.scope.anions = [
            {"_id": {"$oid": "5612c0ade4b09f9838bc3ff9"},
                "label": "FEP", "r": "0.362", "a0": "0.667", "gamma": "1.000",
                "xyz": "25\nFEP\nP 0.587337 -3.567276 -0.223589\nC 1.497389 -4.787012 -1.589929\nF 0.514155 -2.342882 -1.351679\nC -1.350876 -3.945899 -0.911114\nF 2.110879 -3.052791 0.196974\nC 0.702586 -5.001636 1.238880\nF -0.077403 -2.583557 0.929882\nF 0.708422 -5.851535 -1.986991\nF 2.635278 -5.334049 -1.014105\nC 2.035098 -4.123571 -2.927003\nF -1.284685 -4.168733 -2.276880\nF -2.065655 -2.764927 -0.754043\nC -2.342127 -5.057822 -0.370820\nF 0.817547 -6.290565 0.745651\nF -0.451483 -4.977883 2.007118\nC 1.874562 -4.863293 2.303710\nF 3.103129 -5.068560 1.768347\nF 1.707748 -5.820281 3.287153\nF 1.858367 -3.653929 2.922455\nF -1.764579 -6.286026 -0.323949\nF -3.433599 -5.156859 -1.208845\nF -2.828811 -4.751586 0.861238\nF 1.044994 -3.654298 -3.725767\nF 2.722723 -5.070774 -3.661249\nF 2.906444 -3.112645 -2.668382"},
            {
                "_id": {"$oid": "5612c3bfe4b09f9838bc4062"},
                "label": "TFSI", "r": "0.324", "a0": "0.667", "gamma": "1.000",
                "xyz": "15\nTFSI\nS -1.482147 -0.871466 0.362480\nO -1.752196 -1.744667 -0.771918\nO -2.242779 -1.039641 1.592403\nN 0.057017 -0.673277 0.749629\nS 1.283369 -0.820305 -0.281900\nO 2.165497 -1.920421 0.086256\nO 1.001857 -0.584119 -1.691869\nC -2.069727 0.851661 -0.243764\nF -1.463318 1.231959 -1.398763\nF -3.422892 0.815386 -0.470993\nF -1.832956 1.813056 0.696966\nC 2.272301 0.722633 0.258302\nF 3.390255 0.828990 -0.528050\nF 2.684864 0.640410 1.554785\nF 1.549821 1.868364 0.111277"
            }
        ];
        this.scope.cations = ([{"_id": {"$oid": "5612c0ade4b09f9838bc3ff9"},
                "label": "FEP", "r": "0.362", "a0": "0.667", "gamma": "1.000",
                "xyz": "25\nFEP\nP 0.587337 -3.567276 -0.223589\nC 1.497389 -4.787012 -1.589929\nF 0.514155 -2.342882 -1.351679\nC -1.350876 -3.945899 -0.911114\nF 2.110879 -3.052791 0.196974\nC 0.702586 -5.001636 1.238880\nF -0.077403 -2.583557 0.929882\nF 0.708422 -5.851535 -1.986991\nF 2.635278 -5.334049 -1.014105\nC 2.035098 -4.123571 -2.927003\nF -1.284685 -4.168733 -2.276880\nF -2.065655 -2.764927 -0.754043\nC -2.342127 -5.057822 -0.370820\nF 0.817547 -6.290565 0.745651\nF -0.451483 -4.977883 2.007118\nC 1.874562 -4.863293 2.303710\nF 3.103129 -5.068560 1.768347\nF 1.707748 -5.820281 3.287153\nF 1.858367 -3.653929 2.922455\nF -1.764579 -6.286026 -0.323949\nF -3.433599 -5.156859 -1.208845\nF -2.828811 -4.751586 0.861238\nF 1.044994 -3.654298 -3.725767\nF 2.722723 -5.070774 -3.661249\nF 2.906444 -3.112645 -2.668382"},
            {
                "_id": {"$oid": "5612c3bfe4b09f9838bc4062"},
                "label": "TFSI", "r": "0.324", "a0": "0.667", "gamma": "1.000",
                "xyz": "15\nTFSI\nS -1.482147 -0.871466 0.362480\nO -1.752196 -1.744667 -0.771918\nO -2.242779 -1.039641 1.592403\nN 0.057017 -0.673277 0.749629\nS 1.283369 -0.820305 -0.281900\nO 2.165497 -1.920421 0.086256\nO 1.001857 -0.584119 -1.691869\nC -2.069727 0.851661 -0.243764\nF -1.463318 1.231959 -1.398763\nF -3.422892 0.815386 -0.470993\nF -1.832956 1.813056 0.696966\nC 2.272301 0.722633 0.258302\nF 3.390255 0.828990 -0.528050\nF 2.684864 0.640410 1.554785\nF 1.549821 1.868364 0.111277"
            }]);
        this.scope.electrodes = ([{
                "_id": {"$oid": "5612c4c7e4b09f9838bc4088"},
                "label": "bismuth", "d": "0.20", "f1": "1.1", "f2": "1.8", "f3": "1.9",
                "g1": "0.0", "g2": "0.0", "g3": "1000000"
            },
            {
                "_id": {"$oid": "5612c4dbe4b09f9838bc408c"},
                "label": "gold", "d": "0.12", "f1": "32", "f2": "-28", "f3": "500",
                "g1": "0.0", "g2": "0.0", "g3": "1000000"
            }]);
        this.scope.liquids = [
            {"_id": {"$oid": "5612c0ade4b09f9838bc3ff9"},
                "label": "FEP", "r": "0.362", "a0": "0.667", "gamma": "1.000",
                "xyz": "25\nFEP\nP 0.587337 -3.567276 -0.223589\nC 1.497389 -4.787012 -1.589929\nF 0.514155 -2.342882 -1.351679\nC -1.350876 -3.945899 -0.911114\nF 2.110879 -3.052791 0.196974\nC 0.702586 -5.001636 1.238880\nF -0.077403 -2.583557 0.929882\nF 0.708422 -5.851535 -1.986991\nF 2.635278 -5.334049 -1.014105\nC 2.035098 -4.123571 -2.927003\nF -1.284685 -4.168733 -2.276880\nF -2.065655 -2.764927 -0.754043\nC -2.342127 -5.057822 -0.370820\nF 0.817547 -6.290565 0.745651\nF -0.451483 -4.977883 2.007118\nC 1.874562 -4.863293 2.303710\nF 3.103129 -5.068560 1.768347\nF 1.707748 -5.820281 3.287153\nF 1.858367 -3.653929 2.922455\nF -1.764579 -6.286026 -0.323949\nF -3.433599 -5.156859 -1.208845\nF -2.828811 -4.751586 0.861238\nF 1.044994 -3.654298 -3.725767\nF 2.722723 -5.070774 -3.661249\nF 2.906444 -3.112645 -2.668382"},
            {
                "_id": {"$oid": "5612c3bfe4b09f9838bc4062"},
                "label": "TFSI", "r": "0.324", "a0": "0.667", "gamma": "1.000",
                "xyz": "15\nTFSI\nS -1.482147 -0.871466 0.362480\nO -1.752196 -1.744667 -0.771918\nO -2.242779 -1.039641 1.592403\nN 0.057017 -0.673277 0.749629\nS 1.283369 -0.820305 -0.281900\nO 2.165497 -1.920421 0.086256\nO 1.001857 -0.584119 -1.691869\nC -2.069727 0.851661 -0.243764\nF -1.463318 1.231959 -1.398763\nF -3.422892 0.815386 -0.470993\nF -1.832956 1.813056 0.696966\nC 2.272301 0.722633 0.258302\nF 3.390255 0.828990 -0.528050\nF 2.684864 0.640410 1.554785\nF 1.549821 1.868364 0.111277"
            }
        ];
        this.ctrl = $controller('DataCtrl', {
            $scope: this.scope,
            DataService: _DataService_
        });

    }));

    it('Expect $scope to have list of colors and an initial inputsets list.', function () {
        expect(this.scope.colors).toBeDefined();
        expect(this.scope.inputSets).toBeDefined();
        expect(this.scope.colors).toEqual(jasmine.any(Array));
        expect("#000fff").toMatch(/#[0-9a-fA-F]{6}/);
        for (var i = 0; i < this.scope.colors.length; i++) {
            expect(this.scope.colors[i]).toMatch(/#[0-9a-fA-F]{6}/);
        }
        expect(this.scope.inputSets).toEqual([{id: 0, anion: undefined, cation: undefined, electrode: undefined, e: 1.6, color : '#ff0000'}]);

    });

    it('Anion is selected via anionChanged().', function () {
        var dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('a0AnionValue').andReturn(dummyElement);
        this.scope.selectedAnion = this.scope.anions[0];
        this.scope.anionChanged();
        expect(this.scope.inputSets[0].anion.label).toEqual("FEP");
    });

    it('Cation is selected via cationChanged().', function () {
        var dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('a0CationValue').andReturn(dummyElement);
        this.scope.selectedCation = this.scope.cations[1];
        this.scope.cationChanged();
        expect(this.scope.inputSets[0].cation.label).toEqual("TFSI");
    });
    it('Electrode is selected via electrodeChanged().', function () {
        this.scope.selectedElectrode = this.scope.electrodes[1];
        this.scope.electrodeChanged();
        expect(this.scope.inputSets[0].electrode.label).toEqual("gold");
    });
});