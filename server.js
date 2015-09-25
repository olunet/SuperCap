var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Book = require('./models/book');

var config = require('./config.js');
mongoose.connect(config.db);

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

//add more books
app.post('/api/books', function(req, res) {
    var book = new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        author: req.body.author,
        price: req.body.price
    });
    book.save(function(err, book) {
        if (!err) {
            return res.status(200).end();
        }
        return res.status(400).end();
    });
});

//edit books
app.put('/api/books/:id', function(req, res) {
    Book.findById(req.param('id'), function(err, book) {
        if (err || !book) {
            return res.status(404).end();
        } 
        book.title = req.body.title;
        book.isbn = req.body.isbn;
        book.author = req.body.author;
        book.price = req.body.price;
        book.save(function(err, book) {
            if (!err) {
                return res.status(200).end();
            } 
            return res.status(400).end();
        });
    });
});

//get list of books
app.get('/api/books', function(req, res) {
    Book.find({}, function(err, books) {
        return res.json(books);
    });
});


app.listen(process.env.PORT || 3000, function(){
  console.log('listening on', process.env.PORT);
});