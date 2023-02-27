const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config({path : 'variables.env'});

// Modules
const user = require('./modules/user');
const login = require('./modules/login');
const book = require('./modules/book');
const editorial = require('./modules/editorial');
const loan = require('./modules/loan');
const categ = require('./modules/categ')
const review = require('./modules/review')
const auth = require('./middleware/auth')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', user.userRoutes);
app.use('/login', login.loginRoutes);
app.use('/books', /*auth.auth,*/ book.bookRoutes);
app.use('/editorials', editorial.editorialRoutes);
app.use('/loans', loan.loanRoutes);
app.use('/categs', categ.categRoutes);
app.use('/reviews', review.reviewRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});