updateCalculations = function (inputSet, voltages) {

    //Epsilon - relative permittivity, hardcoded for now
    var epsilon = inputSet.e;

    var a0_anion = Number(inputSet.a0Anion);

    var a0_cation = Number(inputSet.a0Cation);

    var gamma_anion = Number(inputSet.gammaAnion);

    var gamma_cation = Number(inputSet.gammaCation);

    //Also known as sigma anion
    var anionCharges = calculateSurfaceCharges(inputSet.anion.r, a0_anion, gamma_anion, inputSet.electrode, epsilon, voltages);

    //Also known as sigma cation
    var cationCharges = calculateSurfaceCharges(inputSet.cation.r, a0_cation, gamma_cation, inputSet.electrode, epsilon, voltages);

    var charges = mergeSurfaceCharges(anionCharges, cationCharges, inputSet.anion, inputSet.cation, voltages);


    //Equation 2 stuff
    var u2s = calculateU2s(charges, inputSet.electrode, epsilon);

    //Equation 3 stuff
    var cs = calculateCs(charges, voltages, u2s);

    inputSet.data = cs;
};

//Used for calculating anion and cation surface charge.
//Same function is used for both since their models are similar
//(at least the values relevant to the calculation are named the same)
calculateSurfaceCharges = function (r, a0, gamma, electrode, epsilon, voltages) {

    //Constant value
    var c1 = 16.02177;
    //Constant value
    var c2 = 0.8854188;//[F/nm]
    //constant value
    var e = 2.718282;

    //theta max is equal to c1 / r^2
    var thetaMax = c1 / Math.pow(r, 2); //[1e/nm2]

    //u max is equal to theta max * (d + r) * c2 / epsilon
    var uMax = thetaMax * (electrode.d + r) * c2 / epsilon; //[1e/nm*]

    var values = [];

    for (var i = 0; i < voltages.length; i++) {
        var u1 = voltages[i];

        var u = u1 / uMax;

        //-1 if u1 is negative, 1 if u1 is positive(or zero) via js ternary operator
        var stepFunction = u1 > 0 ? 1 : -1;

        //exponent is equal to e ^ [ a0 + (1 - a0) * e^(- gamma * u^2) ]
        var exponent = Math.pow(e, a0 + (1 - a0) * Math.pow(e, -gamma * Math.pow(u, 2)));

        //The surface charge of the ion, marked with sigma usually
        var charge = stepFunction * thetaMax * Math.abs(u) * exponent;

        values.push(charge);
    }

    return values;
};

mergeSurfaceCharges = function (anionCharges, cationCharges, anion, cation, voltages) {
    var gamma = Math.sqrt(anion.gamma * cation.gamma);

    var values = [];

    for (var i = 0; i < voltages.length; i++) {
        var u1 = voltages[i];

        var anionWeight = 0.5 + tanh(gamma * u1) / 2;

        var cationWeight = 0.5 - tanh(gamma * u1) / 2;

        var charge = anionCharges[i] * anionWeight + cationCharges[i] * cationWeight;

        values.push(charge);
    }

    return values;
};

calculateU2s = function (surfaceCharges, electrode, epsilon) {
    //Constant value
    var c1 = 16.02177;
    var c2 = 0.8854188;

    var values = [];

    for (var i = 0; i < surfaceCharges.length; i++) {

        var sigma = surfaceCharges[i];

        var f_sigma = electrode.f1 + (electrode.f2 - electrode.f1) * (tanh(sigma / c1 / electrode.f3) + 1) / 2;

        var g_sigma = electrode.g1 * Math.pow((sigma / c1 - electrode.g2), 2) + electrode.g3;

        var u2 = -sigma / (1 / f_sigma + 1 / g_sigma) * c2 / epsilon;

        values.push(u2);
    }

    return values;
};

calculateCs = function (sigmas, u1s, u2s) {

    var values = [];

    for (var i = 0; i < sigmas.length - 1; i++) {

        var uCurrent = Number(u1s[i]) + u2s[i];

        var uNext = Number(u1s[i + 1]) + u2s[i + 1];

        var uDelta = uCurrent - uNext;

        var sigmaCurrent = sigmas[i];

        var sigmaNext = sigmas[i + 1];

        var sigmaDelta = sigmaCurrent - sigmaNext;

        values.push(sigmaDelta / uDelta);

    }

    return values;
};
