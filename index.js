const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./modules/user');
const product = require('./modules/product');
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
app.use('/products', product.productRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});