const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../../../middleware/auth')

router.get('/', reviewController.getAllReviews);
router.get('/:id', auth.auth, reviewController.getReviewById);
router.post('/', auth.auth, reviewController.createReview);
router.put('/:id', auth.auth, reviewController.updateReview);
router.delete('/:id', auth.auth, reviewController.deleteReview);

module.exports = router;