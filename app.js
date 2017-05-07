
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRouter')(Book);

app.use('/api/books', bookRouter);

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Welcome to my API!!!');
});

app.listen(port, function () {
    console.log("Gulp is running in port " + port);
});