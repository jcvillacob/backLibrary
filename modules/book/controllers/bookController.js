const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
  const filters = {};
  if (req.query.title) {
    filters.title = req.query.title;
  }
  if (req.query.author) {
    filters.author = req.query.author;
  }
  if (req.query.publisher) {
    filters.publisher = req.query.publisher;
  }
  if (req.query.publicationYear) {
    filters.publicationYear = req.query.publicationYear;
  }
  if (req.query.ISBN) {
    filters.ISBN = req.query.ISBN;
  }
  if (req.query.category) {
    filters.category = req.query.category;
  }
  if (req.query.editorial) {
    filters.editorial = req.query.editorial;
  }
  if (req.query.available) {
    filters.available = req.query.available;
  }
  Book.find(filters)
  .populate({path: 'category', select: 'name',}).populate({path: 'editorial', select: 'name',})
  .populate({path: 'loan', select: 'returnDate'}).exec((err, books) => {
      if (err) res.status(500).send(err);
      res.status(200).json(books);
    });
};


exports.getBookById = (req, res) => {
  Book.findById(req.params.id)
  .populate({path: 'category', select: 'name',}).populate({path: 'editorial', select: 'name',})
  .populate({path: 'loan', select: 'returnDate'}).exec((err, book) => {
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