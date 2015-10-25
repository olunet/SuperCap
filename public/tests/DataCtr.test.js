// Mocked Service
angular.module('DataCtrl', []).
        factory('DataService', function ($q) {
            var userService = {};


            // example stub method that returns a promise, e.g. if original method returned $http.get(...)
            userService.getAnions = function () {
                var mockUser = {
                    id: 8888,
                    name: "test user"
                };
                return $q.when(mockUser);
            };

            // example stub method that returns a promise, e.g. if original method returned $http.get(...)
            userService.getCations = function () {
                var mockUser = {
                    id: 8888,
                    name: "test user"
                };
                return $q.when(mockUser);
            };

            // example stub method that returns a promise, e.g. if original method returned $http.get(...)
            userService.getElectrodes = function () {
                var mockUser = {
                    id: 8888,
                    name: "test user"
                };
                return $q.when(mockUser);
            };

            // other stubbed methods

            return userService;
        });


describe('DataCtrl tests', function () {

    beforeEach(function () {
        angular.mock.module('SuperCap');

    });
    beforeEach(module('DataCtrl'));


    beforeEach(inject(function ($controller, $rootScope, _DataService_) { // inject mocked service
        this.scope = $rootScope.$new();

        this.ctrl = $controller('DataCtrl', {
            $scope: this.scope,
            DataService: _DataService_
        });

    }));

    it('Expect $scope to have list of colors.', function () {
//        this.scope.selectedAnion = {
//            label: "FEP",
//            r: 0.362,
//            a0: 0.667,
//            gamma: 1.000,
//            xyz: "25\nFEP\nP 0.587337 -3.567276 -0.223589\nC 1.497389 -4.787012 -1.589929\nF 0.514155 -2.342882 -1.351679\nC -1.350876 -3.945899 -0.911114\nF 2.110879 -3.052791 0.196974\nC 0.702586 -5.001636 1.238880\nF -0.077403 -2.583557 0.929882\nF 0.708422 -5.851535 -1.986991\nF 2.635278 -5.334049 -1.014105\nC 2.035098 -4.123571 -2.927003\nF -1.284685 -4.168733 -2.276880\nF -2.065655 -2.764927 -0.754043\nC -2.342127 -5.057822 -0.370820\nF 0.817547 -6.290565 0.745651\nF -0.451483 -4.977883 2.007118\nC 1.874562 -4.863293 2.303710\nF 3.103129 -5.068560 1.768347\nF 1.707748 -5.820281 3.287153\nF 1.858367 -3.653929 2.922455\nF -1.764579 -6.286026 -0.323949\nF -3.433599 -5.156859 -1.208845\nF -2.828811 -4.751586 0.861238\nF 1.044994 -3.654298 -3.725767\nF 2.722723 -5.070774 -3.661249\nF 2.906444 -3.112645 -2.668382"
//        };
//
//        this.scope.selectedCation = {
//            label: "BMIm",
//            r: 0.362,
//            a0: 0.667,
//            gamma: 2.000,
//            xyz: "25\nBMIm\nH -5.394543 -0.342591 -0.463496\nC -4.379393 -0.144278 -0.833283\nC -3.351239 -0.253283 0.304663\nH -4.161619 -0.868893 -1.632493\nH -4.370705 0.862912 -1.276752\nC -1.917403 0.013802 -0.188861\nH -3.398104 -1.258398 0.756118\nH -3.600724 0.463200 1.104812\nC -0.901261 -0.089137 0.955576\nH -1.857740 1.018261 -0.638942\nH -1.649233 -0.710040 -0.975548\nN 0.488975 0.153438 0.492099\nH -0.916916 -1.086723 1.412905\nH -1.109745 0.646270 1.743794\nC 1.433980 -0.785781 0.314888\nC 1.011368 1.379527 0.109983\nN 2.546685 -0.197089 -0.162487\nH 1.320919 -1.841869 0.526724\nC 2.301410 1.161417 -0.297727\nH 0.431016 2.292513 0.161915\nC 3.814702 -0.876189 -0.484487\nH 3.055938 1.848476 -0.661618\nH 4.620249 -0.442318 0.119033\nH 3.718863 -1.942113 -0.255223\nH 4.033674 -0.747224 -1.550779"
//        };
//        this.scope.selectedElectrode = {
//            label: "bismuth",
//            d: 0.20,
//            f1: 1.1,
//            f2: 1.8,
//            f3: 1.9,
//            g1: 0.0,
//            g2: 0.0,
//            g3: 1000000
//        }
//        var inputSet = new InputSet(this.scope.selectedAnion, this.scope.selectedCation, this.scope.selectedElectrode);
//        this.scope.inputSets.push(inputSet);
//        addNewInputSetHTML(inputSet);
        expect(this.scope.colors).toBeDefined();
        expect(this.scope.colors).toEqual(["#ff0000", "#00ff00", "#0000ff", "#0000000", "#ffff00", "#ff00ff", "#00ffff"]);
    });
});