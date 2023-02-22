const Category = require('../models/categoryModel');

exports.getAllCategorys = (req, res) => {
    Category.find({}, (err, categorys) => {
    if (err) res.status(500).send(err);
    res.status(200).json(categorys);
  });
};

exports.getCategoryById = (req, res) => {
    Category.findById(req.params.id, (err, category) => {
    if (err) res.status(500).send(err);
    res.status(200).json(category);
  });
};

exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((err, category) => {
    if (err) res.status(500).send(err);
    res.status(201).json(category);
  });
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, (err, category) => {
    if (err) res.status(500).send(err);
    res.status(200).json(category);
  });
};

exports.deleteCategory = (req, res) => {
  Category.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};