const userRoutes = require('./routes');
const userController = require('./controllers/userController');
const User = require('./models/userModel');

module.exports = {
  userRoutes,
  userController,
  User
};