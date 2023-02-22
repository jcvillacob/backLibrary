const mongoose = require('mongoose');
require('dotenv').config({path : 'variables.env'});
mongoose.set('strictQuery', true);

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
	console.log('BD conectada')
};

module.exports = connectDB;