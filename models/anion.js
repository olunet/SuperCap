var mongoose = require('mongoose');

var AnionSchema = mongoose.Schema({
    name: String,
    value: Number
});

var Anion = mongoose.model('Anion', AnionSchema);

module.exports = Anion;