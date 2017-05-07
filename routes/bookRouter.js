var express = require('express');

var router = function (Book) {
    var bookRouter = express.Router();
    bookRouter.route('/')
        .post(function (req, res) {
            console.log(req.body);
            var book = new Book(req.body);
            console.log(book);
            book.save();
            res.send(book);
        })
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

    bookRouter.route('/:bookId')
        .get(function (req, res) {

            Book.findById(req.params.bookId, function (err, book) {
                if (err)
                    res.send(500, err)
                else
                    res.json(book);
            });
        });
    return bookRouter;

};

module.exports = router;