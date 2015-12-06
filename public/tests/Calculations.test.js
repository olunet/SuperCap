/* global expect */

describe('Calculations tests', function () {

    it('calculateSurfaceCharges must return correct value.', function () {
        expect(calculateSurfaceCharges(0.3, 0.6, 1.000,
                {"d": 0.1}, 0.2, [-2, -1])).toEqual([-3.0700028470366574,
            -1.5350199583370898]);
        expect(calculateSurfaceCharges(0.3, 0.6, 1.000,
                {"d": 0.1}, 0.2, [2, 1])).toEqual([3.0700028470366574,
            1.5350199583370898]);
        expect(calculateSurfaceCharges(-0.3, -0.6, -1.000,
                {"d": -0.1}, -0.2, [2, 1])).toEqual([3.070249995610353,
            1.535050851069435]);
        expect(calculateSurfaceCharges(-0.3, -0.6, -1.000,
                {"d": -0.1}, -0.2, [-2, -1])).toEqual([-3.070249995610353,
            -1.535050851069435]);

    });

    it('calculateU2s must return correct value.', function () {
        expect(calculateU2s([1, 2], {"f1": 1, "f2": 2, "f3": 2, "g1": 0.0,
            "g2": 0.0, "g3": 1000000}, 2)).toEqual([-0.6709687766493518, -1.3557220399277596]);
        expect(calculateU2s([-1, -2], {"f1": -1, "f2": -2, "f3": -2, "g1": -0.0,
            "g2": -0.0, "g3": -1000000}, -2)).toEqual([0.6709687766493518, 1.3557220399277596]);
        expect(calculateU2s([1, 2], {"f1": 1, "f2": 2, "f3": 2, "g1": 2.0,
            "g2": 3.0, "g3": 10}, 2)).toEqual([-0.6356286351085139, -1.28175701429197]);
        expect(calculateU2s([999, 999], {"f1": 999, "f2": 999, "f3": 999, "g1": 999.0,
            "g2": 999.0, "g3": 999999}, 2)).toEqual([-441823.92087026255, -441823.92087026255]);
        expect(calculateU2s([-999, -999], {"f1": -999, "f2": -999, "f3": -999, "g1": -999.0,
            "g2": -999.0, "g3": -999999}, 2)).toEqual([-441823.92087026255, -441823.92087026255]);
    });

    it('calculateCs must return correct value.', function () {
        expect(calculateCs([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toEqual([0.5, 0.5, 0.5, 0.5]);
        expect(calculateCs([-1, -2, -3, -4, -5], [-1, -2, -3, -4, -5], [-1, -2, -3, -4, -5])).toEqual([0.5, 0.5, 0.5, 0.5]);
        expect(calculateCs([0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0])).toMatch([NaN, NaN, NaN, NaN]);
        expect(calculateCs([99, 99, 3, 4, 5], [1, 2, 3, 99, 99], [1, 2, 999, 4, 5])).toEqual([0, -0.09619238476953908,
            -0.0011123470522803114, 1]);
    });

    it('mergeSurfaceCharges must return correct value.', function () {
        expect(mergeSurfaceCharges([1, 2], [1, 2], {"gamma": 1},
        {"gamma": 1}, [1, 2])).toEqual([1, 2]);
        expect(mergeSurfaceCharges([-1, -2], [-1, -2], {"gamma": -1},
        {"gamma": -1}, [-1, -2])).toEqual([-1, -2]);
        expect(mergeSurfaceCharges([-1, -2], [1, 2], {"gamma": -1},
        {"gamma": 1}, [1, -2])).toMatch([NaN, NaN]);
        expect(mergeSurfaceCharges([1, -2], [-1, 2], {"gamma": 1},
        {"gamma": 1}, [1, 2])).toEqual([0.7615941559557649,
            -1.9280551601516338]);
        expect(mergeSurfaceCharges([999, 999], [1, 5], {"gamma": 999},
        {"gamma": 1}, [1, 2])).toEqual([999, 999]);
    });

    it('updateCalculations must give correct value.', function () {
        var inputSet = {id: 0, anion: {
                "_id": {"$oid": "5612c0ade4b09f9838bc3ff9"}, "label": "FEP",
                "r": 0.362, "a0": 0.667, "gamma": 12,
                "xyz": "25\nFEP\nP 0.587337 -3.567276 -0.223589\nC 1.497389 -4.787012 -1.589929\nF 0.514155 -2.342882 -1.351679\nC -1.350876 -3.945899 -0.911114\nF 2.110879 -3.052791 0.196974\nC 0.702586 -5.001636 1.238880\nF -0.077403 -2.583557 0.929882\nF 0.708422 -5.851535 -1.986991\nF 2.635278 -5.334049 -1.014105\nC 2.035098 -4.123571 -2.927003\nF -1.284685 -4.168733 -2.276880\nF -2.065655 -2.764927 -0.754043\nC -2.342127 -5.057822 -0.370820\nF 0.817547 -6.290565 0.745651\nF -0.451483 -4.977883 2.007118\nC 1.874562 -4.863293 2.303710\nF 3.103129 -5.068560 1.768347\nF 1.707748 -5.820281 3.287153\nF 1.858367 -3.653929 2.922455\nF -1.764579 -6.286026 -0.323949\nF -3.433599 -5.156859 -1.208845\nF -2.828811 -4.751586 0.861238\nF 1.044994 -3.654298 -3.725767\nF 2.722723 -5.070774 -3.661249\nF 2.906444 -3.112645 -2.668382"
            }, cation: {
                "_id": {"$oid": "5612c770e4b09f9838bc40f4"}, "label": "BPy",
                "r": 0.352, "a0": 0.667, "gamma": 13,
                "xyz": "24\nBPy\nC -1.333744 -1.190959 0.195308\nC -2.620135 -1.187211 -0.331044\nC -3.261736 0.036038 -0.566822\nC -2.590772 1.228069 -0.261663\nC -1.306034 1.170371 0.264572\nH -4.272713 0.059539 -0.975941\nH -0.781013 -2.106264 0.399937\nH -3.106547 -2.137771 -0.546927\nH -3.053632 2.201131 -0.422463\nH -0.730822 2.058898 0.520044\nN -0.697262 -0.025424 0.489419\nC 0.719049 -0.054793 0.980932\nC 1.717569 0.009218 -0.183265\nH 0.839486 -0.976852 1.563257\nH 0.841019 0.794936 1.664627\nC 3.173088 -0.026544 0.319639\nH 1.540970 0.932493 -0.760327\nH 1.532775 -0.838856 -0.863796\nC 4.179198 0.040516 -0.841296\nH 3.334032 -0.949121 0.902289\nH 3.340514 0.816762 1.010567\nH 5.210865 0.012358 -0.464124\nH 4.046404 -0.808502 -1.529397\nH 4.054721 0.968785 -1.419745"
            }, electrode: {
                "_id": {"$oid": "5612c4c7e4b09f9838bc4088"}, "label": "bismuth",
                "d": 0.20, "f1": 1.1, "f2": 1.8, "f3": 1.9, "g1": 0.0,
                "g2": 0.0, "g3": 1000000
            }, e: 1.6, color: '#ff0000', "a0Anion": 1, "a0Cation": 1, "gammaAnion": 1, "gammaCation": 1};
        updateCalculations(inputSet, [1, 2]);
        expect(inputSet.data).toEqual([-1.1980279733316337]);
        updateCalculations(inputSet, [-1, 2]);
        expect(inputSet.data).toEqual([-1.357486227226484]);
        updateCalculations(inputSet, [0, -2]);
        expect(inputSet.data).toEqual([-1.7002495776544786]);
        updateCalculations(inputSet, [-1, -2]);
        expect(inputSet.data).toEqual([-1.8473251068015493]);
        updateCalculations(inputSet, [9, 9]);
        expect(inputSet.data).toMatch([NaN]);
    });
});