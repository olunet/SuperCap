/* global expect */

describe('Calculations tests', function () {

    it('calculateSurfaceCharges must return correct value.', function () {
        expect(calculateSurfaceCharges(0.3, 0.6, 1.000,
                {"d": 0.1}, 0.2, [-2, -1])).toEqual([-3.0700028470366574,
            -1.5350199583370898]);
    });

    it('calculateU2s must return correct value.', function () {
        expect(calculateU2s([1, 2], {"f1": 1, "f2": 2, "f3": 2, "g1": 0.0,
            "g2": 0.0, "g3": 1000000}, 2)).toEqual([-0.7663545781054755,
            -1.6652899597541926]);
    });

    it('calculateCs must return correct value.', function () {
        expect(calculateCs([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toEqual([0.5, 0.5, 0.5, 0.5]);
    });
});