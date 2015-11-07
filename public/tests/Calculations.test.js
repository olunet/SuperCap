/* global expect */

describe('Calculations tests', function () {

    it('calculateSurfaceCharges must return correct value.', function () {
        expect(calculateSurfaceCharges(0.362, 0.667, 1.000, {"d": 0.12}, 0.20, [-2, -1.96])).toEqual([-0.25477094912686665, -0.2496757236223746]);
    });
});