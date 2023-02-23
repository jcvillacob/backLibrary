const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
  returnDate: {type: Date, default: function() {
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);
      return returnDate;
    }},
  returned: {type: Boolean, required: true, default: false},
  loanDate: {type: Date, default: Date.now}
});

/* loanSchema.pre('findOneAndUpdate', async function(next) {
  const loan = await this.model.findOne(this.getQuery());
  if (this.getUpdate().returned === true) {
    const book = await this.model('Book').findByIdAndUpdate(
      loan.book, 
      { $set: { available: true, loan: null } }
    );
  } else if (this.getUpdate().returned === false) {
    const book = await this.model('Book').findByIdAndUpdate(
      loan.book, 
      { $set: { available: false } }
    );
  }
  next();
}); */


module.exports = mongoose.model('Loan', loanSchema);
