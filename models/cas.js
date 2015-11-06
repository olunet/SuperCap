var mongoose = require('mongoose');

var CasSchema = mongoose.Schema({
    number: String,
    anionlabel: String,
    cationlabel: String
});

var Cas = mongoose.model('Cas', CasSchema);

module.exports = Cas;