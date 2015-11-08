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
            {
                "_id": {"$oid": "5612c0ade4b09f9838bc3ff9"}, "label": "FEP",
                "r": 0.362, "a0": 0.667, "gamma": 12,
                "xyz": "25\nFEP\nP 0.587337 -3.567276 -0.223589\nC 1.497389 -4.787012 -1.589929\nF 0.514155 -2.342882 -1.351679\nC -1.350876 -3.945899 -0.911114\nF 2.110879 -3.052791 0.196974\nC 0.702586 -5.001636 1.238880\nF -0.077403 -2.583557 0.929882\nF 0.708422 -5.851535 -1.986991\nF 2.635278 -5.334049 -1.014105\nC 2.035098 -4.123571 -2.927003\nF -1.284685 -4.168733 -2.276880\nF -2.065655 -2.764927 -0.754043\nC -2.342127 -5.057822 -0.370820\nF 0.817547 -6.290565 0.745651\nF -0.451483 -4.977883 2.007118\nC 1.874562 -4.863293 2.303710\nF 3.103129 -5.068560 1.768347\nF 1.707748 -5.820281 3.287153\nF 1.858367 -3.653929 2.922455\nF -1.764579 -6.286026 -0.323949\nF -3.433599 -5.156859 -1.208845\nF -2.828811 -4.751586 0.861238\nF 1.044994 -3.654298 -3.725767\nF 2.722723 -5.070774 -3.661249\nF 2.906444 -3.112645 -2.668382"
            }
            , {
                "_id": {"$oid": "5612c3dae4b09f9838bc4066"}, "label": "FSI", "r": 0.282,
                "a0": 0.667, "gamma": 32,
                "xyz": "9\nFSI\nS 2.692309 0.313042 2.873993\nO 2.834737 -1.024988 2.328268\nO 3.711966 0.839489 3.764484\nN 2.144683 1.273626 1.714582\nS 2.223591 2.873049 1.793870\nO 3.498921 3.453815 2.173568\nO 1.517658 3.410497 0.644473\nF 1.361471 0.183502 3.853760\nF 1.235626 3.234934 3.074303"
            }
        ];
        this.scope.cations = ([
            {
                "_id": {"$oid": "5612c770e4b09f9838bc40f4"}, "label": "BPy",
                "r": 0.352, "a0": 0.667, "gamma": 13,
                "xyz": "24\nBPy\nC -1.333744 -1.190959 0.195308\nC -2.620135 -1.187211 -0.331044\nC -3.261736 0.036038 -0.566822\nC -2.590772 1.228069 -0.261663\nC -1.306034 1.170371 0.264572\nH -4.272713 0.059539 -0.975941\nH -0.781013 -2.106264 0.399937\nH -3.106547 -2.137771 -0.546927\nH -3.053632 2.201131 -0.422463\nH -0.730822 2.058898 0.520044\nN -0.697262 -0.025424 0.489419\nC 0.719049 -0.054793 0.980932\nC 1.717569 0.009218 -0.183265\nH 0.839486 -0.976852 1.563257\nH 0.841019 0.794936 1.664627\nC 3.173088 -0.026544 0.319639\nH 1.540970 0.932493 -0.760327\nH 1.532775 -0.838856 -0.863796\nC 4.179198 0.040516 -0.841296\nH 3.334032 -0.949121 0.902289\nH 3.340514 0.816762 1.010567\nH 5.210865 0.012358 -0.464124\nH 4.046404 -0.808502 -1.529397\nH 4.054721 0.968785 -1.419745"
            }, {
                "_id": {"$oid": "5612c7a1e4b09f9838bc40fc"}, "label": "TEPA",
                "r": 0.308, "a0": 0.667, "gamma": 22,
                "xyz": "32\nTEPA\nC -0.076462 1.719644 2.232476\nH 0.084289 2.763093 1.935702\nH -1.050206 1.663517 2.737266\nC 1.034838 1.281943 3.188404\nH 0.933057 0.218847 3.451115\nH 2.018625 1.419297 2.720217\nC 0.960612 2.135666 4.469581\nH 1.081220 3.205326 4.243246\nH -0.002541 2.000765 4.983628\nH 1.758690 1.846439 5.165455\nN -0.245327 0.936308 0.919435\nC -0.465947 -0.563288 1.172731\nH 0.455402 -0.932724 1.631820\nC 2.158446 0.177409 0.132132\nC 0.970143 1.127715 -0.024492\nC -1.665279 -0.929760 2.043943\nH -0.551920 -1.015025 0.174996\nH 2.941526 0.541156 -0.549034\nH 2.579352 0.162353 1.142612\nH 0.565371 1.025955 -1.039791\nH 1.281950 2.169648 0.112665\nH -2.323602 1.379527 0.905978\nC -1.495223 1.490583 0.198480\nC -1.415260 2.937129 -0.286201\nH -1.669565 0.808892 -0.644826\nH 1.917192 -0.848611 -0.171557\nH -2.627438 -0.650071 1.598032\nH -1.595191 -0.504399 3.053569\nH -1.663527 -2.023977 2.150617\nH -2.370519 3.161404 -0.782182\nH -0.619102 3.100802 -1.022276\nH -1.302055 3.655396 0.534893"
            }]);
        this.scope.electrodes = ([
            {
                "_id": {"$oid": "5612c4c7e4b09f9838bc4088"}, "label": "bismuth",
                "d": 0.20, "f1": 1.1, "f2": 1.8, "f3": 1.9, "g1": 0.0,
                "g2": 0.0, "g3": 1000000
            },
            {
                "_id": {"$oid": "5612c4dbe4b09f9838bc408c"}, "label": "gold",
                "d": 0.17, "f1": 32, "f2": -28, "f3": 500, "g1": 0.0,
                "g2": 0.0, "g3": 1000000
            }
        ]);
        this.scope.liquids = [
            {
                "_id": {"$oid": "563d0e69e4b0ecb0579de309"},
                "number": "1111-1111-11", "anionlabel": "FEP",
                "cationlabel": "BPy", "e": 1.6
            },
            {
                "_id": {"$oid": "563d1209e4b0ecb0579de345"},
                "number": "2444-4444-44", "anionlabel": "FSI",
                "cationlabel": "TEPA", "e": 1.6
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

        expect(this.scope.inputSets).toEqual([{id: 0, anion: undefined, cation: undefined, electrode: undefined, e: 1.6, color: '#ff0000'}]);

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
        expect(this.scope.inputSets[0].cation.label).toEqual("TEPA");
    });
    it('Electrode is selected via electrodeChanged().', function () {
        this.scope.selectedElectrode = this.scope.electrodes[1];
        this.scope.electrodeChanged();
        expect(this.scope.inputSets[0].electrode.label).toEqual("gold");
    });

    it('Can add multiple inputsets with their own parameters and switch between them.', function () {
        // Add inputset nr. 1
        this.scope.inputSets[0].anion = this.scope.anions[0];
        this.scope.inputSets[0].cation = this.scope.cations[0];
        this.scope.inputSets[0].electrode = this.scope.electrodes[1];
        this.scope.inputSets[0].a0Anion = parseFloat(this.scope.anions[0].a0);
        this.scope.inputSets[0].a0Cation = parseFloat(this.scope.cations[0].a0);
        this.scope.inputSets[0].gammaAnion = parseFloat(this.scope.anions[0].gamma);
        this.scope.inputSets[0].gammaCation = parseFloat(this.scope.cations[0].gamma);

        expect(this.scope.activeInputSet.anion.label).toEqual("FEP");
        expect(this.scope.activeInputSet.cation.label).toEqual("BPy");
        expect(this.scope.activeInputSet.electrode.label).toEqual("gold");

        //Change a0Cation value
        this.scope.activeInputSet.a0Cation = this.scope.inputSets[0].a0Cation +0.3;
        expect(this.scope.inputSets[0].a0Cation).toEqual(parseFloat(0.667+0.3));
        
        // Add inputset nr. 2
        this.scope.addNewInputSet();
        this.scope.activeInputSet.anion = this.scope.anions[1];
        this.scope.activeInputSet.cation = this.scope.cations[1];
        this.scope.activeInputSet.electrode = this.scope.electrodes[0];
        expect(this.scope.activeInputSet.anion.label).toEqual("FSI");
        expect(this.scope.activeInputSet.cation.label).toEqual("TEPA");
        expect(this.scope.activeInputSet.electrode.label).toEqual("bismuth");
        expect(this.scope.inputSets.length).toEqual(2);
        
        //Change a0Cation value on inputset nr. 2
        this.scope.activeInputSet.a0Cation = this.scope.activeInputSet.a0Cation - 0.1;
        
        
        //Expect the inputset's nr. 1 a0Cation value to stay the same
        this.scope.switchToInputSet(this.scope.inputSets[0]);
        expect(this.scope.activeInputSet.a0Cation).toEqual(parseFloat(0.667+0.3));
    });
    
    it('Can remove a input set.', function() {
        // Adding two input sets
        this.scope.inputSets[0].anion = this.scope.anions[0];
        this.scope.inputSets[0].cation = this.scope.cations[0];
        this.scope.inputSets[0].electrode = this.scope.electrodes[1];
        this.scope.inputSets[0].a0Anion = parseFloat(this.scope.anions[0].a0);
        this.scope.inputSets[0].a0Cation = parseFloat(this.scope.cations[0].a0);
        this.scope.inputSets[0].gammaAnion = parseFloat(this.scope.anions[0].gamma);
        this.scope.inputSets[0].gammaCation = parseFloat(this.scope.cations[0].gamma);
        
        this.scope.addNewInputSet();
        this.scope.inputSets[1].anion = this.scope.anions[1];
        this.scope.inputSets[1].cation = this.scope.cations[1];
        this.scope.inputSets[1].electrode = this.scope.electrodes[0];
        this.scope.inputSets[1].a0Anion = parseFloat(this.scope.anions[1].a0);
        this.scope.inputSets[1].a0Cation = parseFloat(this.scope.cations[1].a0);
        this.scope.inputSets[1].gammaAnion = parseFloat(this.scope.anions[1].gamma);
        this.scope.inputSets[1].gammaCation = parseFloat(this.scope.cations[1].gamma);
        // Checking if values are correct
        expect(this.scope.activeInputSet.anion.label).toEqual("FSI");
        expect(this.scope.activeInputSet.cation.label).toEqual("TEPA");
        expect(this.scope.activeInputSet.electrode.label).toEqual("bismuth");
        
        expect(this.scope.inputSets[0].anion.label).toEqual("FEP");
        expect(this.scope.inputSets[0].cation.label).toEqual("BPy");
        expect(this.scope.inputSets[0].electrode.label).toEqual("gold");
        var inputSetsLength1 = this.scope.inputSets.length;
        // Removing input set and expecting the length of input sets to be lesser
        this.scope.inputSets.splice(0, 1);
        var inputSetsLength2 = this.scope.inputSets.length;
        expect(inputSetsLength1).toBeGreaterThan(inputSetsLength2);
    });
});