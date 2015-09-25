var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    title: String,
    isbn: String,
    author: String,
    price: Number
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;