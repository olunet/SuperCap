var mongoose = require('mongoose');

var ElectrolyteSchema = mongoose.Schema({
    name: String,
    value: Number
});

var Electrolyte = mongoose.model('Electrolyte', ElectrolyteSchema);

module.exports = Electrolyte;