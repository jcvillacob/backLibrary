const Review = require('../models/reviewModel');
const Book = require('../../book/models/bookModel');

exports.getAllReviews = (req, res) => {
    Review.find({book: { $regex: new RegExp(req.query.book, 'i') }})
    .populate({path: 'user', select: 'name',}).exec((err, reviews) => {
    if (err) res.status(500).send(err);
    res.status(200).json(reviews);
  });
};

exports.getReviewById = (req, res) => {
    Review.findById(req.params.id)
    .populate({path: 'user', select: 'name',}).exec((err, review) => {
    if (err) res.status(500).send(err);
    res.status(200).json(review);
  });
};

exports.createReview = (req, res) => {
  const newReview = new Review(req.body);
  const { book } = req.body;

  Book.findById(book, (err, book) => {
    if (err) res.status(500).send(err);
    newReview.book = book.title;

    newReview.save((err, review) => {
      if (err) res.status(500).send(err);
      res.status(201).json(review);
    });
  });
};

exports.updateReview = (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body, (err, review) => {
    if (err) res.status(500).send(err);
    res.status(200).json(review);
  });
};

exports.deleteReview = (req, res) => {
    Review.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};