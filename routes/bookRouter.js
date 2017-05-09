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

    //Middleware
    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.send(500, err)
            else if (book) {
                req.book = book;
                next();
            }
            else
                res.send(404, 'Not found');
        });
    });

    bookRouter.route('/:bookId')
        .get(function (req, res) {
            res.json(req.book);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if (err)
                    res.status(500, err).send();
                else
                    res.json(req.book);
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save(function (err) {
                if (err)
                    res.status(500, err).send();
                else
                    res.json(req.book);
            });
        })
        .delete(function (req, res) {
            req.book.remove();
            res.status(204, 'Item Removed').send();
        });
    return bookRouter;

};

module.exports = router;