var mongoose = require('mongoose');

var CationSchema = mongoose.Schema({
    name: String,
    value: Number
});

var Cation = mongoose.model('Cation', CationSchema);

module.exports = Cation;