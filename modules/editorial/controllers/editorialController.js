const Editorial = require('../models/editorialModel');

exports.getAllEditorials = (req, res) => {
    Editorial.find({}, (err, editorials) => {
    if (err) res.status(500).send(err);
    res.status(200).json(editorials);
  });
};

exports.getEditorialById = (req, res) => {
    Editorial.findById(req.params.id, (err, editorial) => {
    if (err) res.status(500).send(err);
    res.status(200).json(editorial);
  });
};

exports.createEditorial = (req, res) => {
  const newEditorial = new Editorial(req.body);
  newEditorial.save((err, editorial) => {
    if (err) res.status(500).send(err);
    res.status(201).json(editorial);
  });
};

exports.updateEditorial = (req, res) => {
  Editorial.findByIdAndUpdate(req.params.id, req.body, (err, editorial) => {
    if (err) res.status(500).send(err);
    res.status(200).json(editorial);
  });
};

exports.deleteEditorial = (req, res) => {
  Editorial.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};