const categRoutes = require('./routes');
const categController= require('./controllers/categController');
const Categ = require('./models/categModel');

module.exports = {
  categRoutes,
  categController,
  Categ
};