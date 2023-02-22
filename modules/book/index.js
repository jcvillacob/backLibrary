const bookRoutes = require('./routes');
const bookController= require('./controllers/bookController');
const Book = require('./models/bookModel');

module.exports = {
  bookRoutes ,
  bookController,
  Book
};