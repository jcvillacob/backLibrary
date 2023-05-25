const Review = require('../models/reviewModel');
const Book = require('../../book/models/bookModel');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.query.book })
      .populate('user', 'name')
      .exec();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getReviewById = (req, res) => {
  Review.findById(req.params.id)
    .populate({ path: 'user', select: 'name', }).exec((err, review) => {
      if (err) res.status(500).send(err);
      res.status(200).json(review);
    });
};

exports.createReview = async (req, res) => {
  req.body.user = req.userData.userId;
  const newReview = new Review(req.body);
  try {
    const review = await newReview.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).send(err);
  }
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