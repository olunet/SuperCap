var mongoose = require('mongoose');

var LiquidSchema = mongoose.Schema({
    number: String,
    anionlabel: String,
    cationlabel: String,
    e:Number
});

var Liquid = mongoose.model('Liquid', LiquidSchema);

module.exports = Liquid;