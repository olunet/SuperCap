var mongoose = require('mongoose');

var ElectrodeSchema = mongoose.Schema({
    label: String,
    d: Number,
    f1: Number,
    f2: Number,
    f3: Number,
    g1: Number,
    g2: Number,
    g3: Number
});

var Electrode = mongoose.model('Electrode', ElectrodeSchema);

module.exports = Electrode;