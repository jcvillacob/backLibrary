const productRoutes = require('./routes');
const productController= require('./controllers/productController');
const Product = require('./models/productModel');

module.exports = {
  productRoutes ,
  productController,
  Product
};