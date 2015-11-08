function tanh (arg) {
    // sinh(number)/cosh(number)
    return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
}