const Loan = require('../models/loanModel');

exports.getAllLoans = (req, res) => {
    Loan.find({}, (err, loans) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loans);
  });
};

exports.getLoanById = (req, res) => {
  Loan.findById(req.params.id, (err, loan) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loan);
  });
};

exports.createLoan = (req, res) => {
  const newLoan = new Loan(req.body);
  newLoan.save((err, loan) => {
    if (err) res.status(500).send(err);
    res.status(201).json(loan);
  });
};

exports.updateLoan = (req, res) => {
  Loan.findByIdAndUpdate(req.params.id, req.body, (err, loan) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loan);
  });
};

exports.deleteLoan = (req, res) => {
  Loan.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};