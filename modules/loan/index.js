const loanRoutes = require('./routes');
const loanController= require('./controllers/loanController');
const Loan = require('./models/loanModel');

module.exports = {
  loanRoutes,
  loanController,
  Loan
};