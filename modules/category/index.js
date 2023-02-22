const categoryRoutes = require('./routes');
const categoryController= require('./controllers/categoryController');
const Category = require('./models/categoryModel');

module.exports = {
  categoryRoutes,
  categoryController,
  Category
};