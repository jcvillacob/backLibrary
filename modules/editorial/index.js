const editorialRoutes = require('./routes');
const editorialController= require('./controllers/editorialController');
const Editorial = require('./models/editorialModel');

module.exports = {
  editorialRoutes,
  editorialController,
  Editorial
};