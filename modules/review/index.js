const reviewRoutes = require('./routes');
const reviewController= require('./controllers/reviewController');
const Review = require('./models/reviewModel');

module.exports = {
    reviewRoutes,
    reviewController,
    Review
};