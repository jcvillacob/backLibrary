const mongoose = require('mongoose');

const categSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

module.exports = mongoose.model('Categ', categSchema);