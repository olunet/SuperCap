var mongoose = require('mongoose');

var CationSchema = mongoose.Schema({
    label: String,
    r: Number,
    a0: Number,
    gamma: Number,
    xyz: String
});

var Cation = mongoose.model('Cation', CationSchema);

module.exports = Cation;