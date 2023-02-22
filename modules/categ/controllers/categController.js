const Categ = require('../models/categModel');

exports.getAllCategs = (req, res) => {
    Categ.find({}, (err, categs) => {
    if (err) res.status(500).send(err);
    res.status(200).json(categs);
  });
};

exports.getCategById = (req, res) => {
  Categ.findById(req.params.id, (err, categ) => {
    if (err) res.status(500).send(err);
    res.status(200).json(categ);
  });
};

exports.createCateg = (req, res) => {
  const newCateg = new Categ (req.body);
  newCateg.save((err, categ) => {
    if (err) res.status(500).send(err);
    res.status(201).json(categ);
  });
};

exports.updateCateg = (req, res) => {
  Categ.findByIdAndUpdate(req.params.id, req.body, (err, categ) => {
    if (err) res.status(500).send(err);
    res.status(200).json(categ);
  });
};

exports.deleteCateg = (req, res) => {
  Categ.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};