const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, default: null },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  ISBN: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categ', required: true },
  editorial: { type: mongoose.Schema.Types.ObjectId, ref: 'Editorial', required: true },
  available: { type: Boolean, default: true },
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', default: null },
  barcode: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Book', bookSchema);