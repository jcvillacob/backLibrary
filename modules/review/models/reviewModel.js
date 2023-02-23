const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  book: {type: String, ref: 'Book', required: true},
  rating: {type: Number, required: true, validate: {
    validator: function(v) {
        return v >= 0 && v <= 10;
    },
    message: props => `${props.value} is not a valid rating. Rating must be between 0 and 10.`
    }},
  comment: {type: String}
});

module.exports = mongoose.model('Review', reviewSchema);