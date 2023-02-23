const Loan = require('../models/loanModel');
const Book = require('../../book/models/bookModel');

exports.getAllLoans = (req, res) => {
    Loan.find({})
    .populate({path: 'user', select: 'name',}).populate({path: 'book', select: 'title',}).exec((err, loans) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loans);
  });
};

exports.getLoanById = (req, res) => {
  Loan.findById(req.params.id)
  .populate({path: 'user', select: 'name',}).populate({path: 'book', select: 'title',}).exec((err, loan) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loan);
  });
};

exports.createLoan = (req, res) => {
  const newLoan = new Loan(req.body);
  Book.findById(newLoan.book, (err, book) => {
    if (err) res.status(500).send(err);
    if (!book.available) {
      return res.status(400).json({ message: 'Book is not available' });
    }
    book.available = false;
    newLoan.save((err, loan) => {
      if (err) {
        book.available = true;
        return res.status(500).send(err);
      }
      book.loan = loan._id;
      book.save((err, book) => {
        if (err) {
          book.available = true;
          return res.status(500).send(err);
        }
        res.status(201).json({ message: 'Loan created successfully', loan });
      });
    });
  });
};

exports.updateLoan = (req, res) => {
  Loan.findByIdAndUpdate(req.params.id, req.body, (err, loan) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loan);
  });
};

exports.deleteLoan = (req, res) => {
  Loan.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};