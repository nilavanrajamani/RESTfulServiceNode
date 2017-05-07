
var express = require('express');

var app = express();

var bookRouter = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

bookRouter.route('/Books')
    .get(function (req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err)
                res.send(500, err)
            else
                res.json(books);
        });
    });

bookRouter.route('/Books/:bookId')
    .get(function (req, res) {

        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.send(500, err)
            else
                res.json(book);
        });
    });

app.use('/api', bookRouter);

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Welcome to my API!!!');
});

app.listen(port, function () {
    console.log("Gulp is running in port " + port);
});