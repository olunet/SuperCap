var mongoose = require('mongoose');

var IonicLiquidSchema = mongoose.Schema({
    cationname: String,
    anionname: String,
    number: String
});

var IonicLiquid = mongoose.model('IonicLiquid', IonicLiquidSchema);

module.exports = IonicLiquid;