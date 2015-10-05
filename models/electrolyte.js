var mongoose = require('mongoose');

var ElectrolyteSchema = mongoose.Schema({
    label: String,
    d: Number,
    f1: Number,
    f2: Number,
    f3: Number,
    g1: Number,
    g2: Number,
    g3: Number
});

var Electrolyte = mongoose.model('Electrolyte', ElectrolyteSchema);

module.exports = Electrolyte;