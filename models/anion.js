var mongoose = require('mongoose');

var AnionSchema = mongoose.Schema({
    label: String,
    r: Number,
    a0: Number,
    gamma: Number,
    xyz: String
});

var Anion = mongoose.model('Anion', AnionSchema);

module.exports = Anion;