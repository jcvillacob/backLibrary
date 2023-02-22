const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.status(200).json(users);
  });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.status(500).send(err);
    res.status(200).json(user);
  });
};

exports.createUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) res.status(500).send(err);
    res.status(201).json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) res.status(500).send(err);
    res.status(200).json(user);
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};