var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Anion = require('./models/anion');
var Cation = require('./models/cation');
var Electrode = require('./models/electrode');
var Liquid = require('./models/liquid');

var config = require('./config.js');
mongoose.connect(config.db);

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

////add more books
//app.post('/api/books', function(req, res) {
//    var book = new Book({
//        title: req.body.title,
//        isbn: req.body.isbn,
//        author: req.body.author,
//        price: req.body.price
//    });
//    book.save(function(err, book) {
//        if (!err) {
//            return res.status(200).end();
//        }
//        return res.status(400).end();
//    });
//});
//
////edit books
//app.put('/api/books/:id', function(req, res) {
//    Book.findById(req.param('id'), function(err, book) {
//        if (err || !book) {
//            return res.status(404).end();
//        } 
//        book.title = req.body.title;
//        book.isbn = req.body.isbn;
//        book.author = req.body.author;
//        book.price = req.body.price;
//        book.save(function(err, book) {
//            if (!err) {
//                return res.status(200).end();
//            } 
//            return res.status(400).end();
//        });
//    });
//});

/** OUR APPLICATION **/

//Fetches all the available anions
app.get('/api/anions', function(req, res) {
    Anion.find({}, function(err, anions) {
        return res.json(anions);
    });
});

//Fetches all the available cations
app.get('/api/cations', function(req, res) {
    Cation.find({}, function(err, cations) {
        return res.json(cations);
    });
});

//Fetches all the available electrodes
app.get('/api/electrodes', function(req, res) {
    Electrode.find({}, function(err, electrodes) {
        return res.json(electrodes);
    });
});

//Fetches all the available casnumbers
app.get('/api/ioniq_liquids', function(req, res) {
    Liquid.find({}, function(err, liquids) {
        return res.json(liquids);
    });
});

app.listen(process.env.PORT || 3000, function(){
    if(process.env.PORT) {
        console.log('listening on', process.env.PORT);
    } else {
        console.log('listening on 3000.');
    }
});