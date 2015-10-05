updateCalculations = function (anion, cation, electrode) {
    
    //Minimum voltage on the X axis
    var min = -2;
    //Maximum voltage on the X axis
    var max = 2;
    //Number of subdivisions on the X axis
    var numSteps = 20;
    
    //Epsilon - relative permittivity, hardcoded for now
    var epsilon = 2;
    
    //Calculate the size of 1 step on the X axis
    var steps = calculateVoltageSteps(min, max, numSteps);
    
    //Also known as sigma anion
    var anionCharges = calculateSurfaceCharge(anion, electrode, epsilon, steps);
    
    //Also known as sigma cation
    var cationCharges = calculateSurfaceCharge(cation, electrode, epsilon, steps);
    
    var charges = mergeSurfaceCharges(anionCharges, cationCharges, anion, cation, steps);
    
    console.log(charges);
}

//Used for calculating anion and cation surface charge.
//Same function is used for both since their models are similar
//(at least the values relevant to the calculation are named the same)
calculateSurfaceCharge = function(ion, electrode, epsilon, steps) {
    //Constant value
    var c1 = 1;
    //Constant value
    var c2 = 0.8854;
    //constant value
    var e = 2.71828;
    
    //theta max is equal to c1 / r^2
    var thetaMax = c1 / Math.pow(ion.r, 2);
    
    //u max is equal to theta max * (d + r) * c2 / epsilon
    var uMax = thetaMax * (electrode.d + ion.r) * c2 / epsilon;
    
    var values = [];
    
    for(var i = 0; i < steps.length; i++) {
        var u1 = steps[i];
        
        var u = u1 / uMax;
        
        //-1 if u1 is negative, 1 if u1 is positive(or zero) via js ternary operator
        var stepFunction = u1 > 0 ? 1 : -1;
        
        //exponent is equal to e ^ [ a0 + (1 - a0) * e^(- gamma * u^2) ]
        var exponent = Math.pow(  e, ion.a0 + (1 - ion.a0) * Math.pow( e, - ion.gamma * Math.pow(u, 2) )  );
        
        //The surface charge of the ion, marked with sigma usually
        var charge = stepFunction * thetaMax * Math.abs(u) * exponent;
        
        values.push(charge);
    }
    return values;
}

mergeSurfaceCharges = function(anionCharges, cationCharges, anion, cation, steps) {
    
    var gamma = Math.sqrt(anion.gamma * cation.gamma);
    
    var values = [];
    
    for(var i = 0; i < steps.length; i++) {
        var u1 = steps[i];

        //TODO: Use the proper u value
        var anionWeight = 0.5;// + Math.tanh(gamma * u)/2;
        
        var cationWeight = 0.5;// - Math.tanh(gamma * u)/2;
        
        var charge = anionCharges[i] * anionWeight + cationCharges[i] * cationWeight;

        values.push(charge);
    }
    
    return values;
}

calculateVoltageSteps = function(min, max, numSteps) {
    var step = (max - min) / numSteps;
    
    var steps = [];
    
    for(var i = 0; i < numSteps; i++) {
        steps.push(min + step * i);
    }
    
    return steps;
}