const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Modules
const user = require('./modules/user');
const book = require('./modules/book');
const editorial = require('./modules/editorial');
const loan = require('./modules/loan');
const categ = require('./modules/categ')


// const middleware = require('./middleware');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config({path : 'variables.env'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware
// app.use(middleware);
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', user.userRoutes);
app.use('/books', book.bookRoutes);
app.use('/editorials', editorial.editorialRoutes);
app.use('/loans', loan.loanRoutes);
app.use('/categs', categ.categRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});