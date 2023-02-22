const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
  Book.find({}, (err, books) => {
    if (err) res.status(500).send(err);
    res.status(200).json(books);
  });
};

exports.getBookById = (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) res.status(500).send(err);
    res.status(200).json(book);
  });
};

exports.createBook = (req, res) => {
  const newBook = new Book(req.body);
  newBook.save((err, book) => {
    if (err) res.status(500).send(err);
    res.status(201).json(book);
  });
};

exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
    if (err) res.status(500).send(err);
    res.status(200).json(book);
  });
};

exports.deleteBook = (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};