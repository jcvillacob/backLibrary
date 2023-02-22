const mongoose = require('mongoose');

const editorialSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true},
});

module.exports = mongoose.model('Editorial', editorialSchema);
