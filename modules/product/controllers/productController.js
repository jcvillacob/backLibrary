const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.status(500).send(err);
    res.status(200).json(products);
  });
};

exports.getProductById = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) res.status(500).send(err);
    res.status(200).json(product);
  });
};

exports.createProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save((err, product) => {
    if (err) res.status(500).send(err);
    res.status(201).json(product);
  });
};

exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
    if (err) res.status(500).send(err);
    res.status(200).json(product);
  });
};

exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};