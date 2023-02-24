const Loan = require('../models/loanModel');
const Book = require('../../book/models/bookModel');
const User = require('../../user/models/userModel');
const nodemailer = require('nodemailer');

exports.getAllLoans = (req, res) => {
    Loan.find({})
    .populate({path: 'user', select: 'name',}).populate({path: 'book', select: 'title',}).exec((err, loans) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loans);
  });
};

exports.getLoanById = (req, res) => {
  Loan.findById(req.params.id)
  .populate({path: 'user', select: 'name',}).populate({path: 'book', select: 'title',}).exec((err, loan) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loan);
  });
};

exports.createLoan = (req, res) => {
  const newLoan = new Loan(req.body);
  Book.findById(newLoan.book, (err, book) => {
    if (err) res.status(500).send(err);
    if (!book.available) {
      return res.status(400).json({ message: 'Book is not available' });
    }
    book.available = false;
    newLoan.save((err, loan) => {
      if (err) {
        book.available = true;
        return res.status(500).send(err);
      }
      book.loan = loan._id;
      book.save((err, book) => {
        if (err) {
          book.available = true;
          return res.status(500).send(err);
        }
        User.findById(newLoan.user, (err, user) => {
          if (err) res.status(500).send(err);
          // Enviar notificación por email al usuario
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'jucaviza6@gmail.com', // Cambiar por tu correo
              pass: 'qxqqnwychkajbfzs' // Cambiar por tu contraseña
            }
          });

          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          const formattedDate = loan.returnDate.toLocaleDateString('es-ES', options);

          const mailOptions = {
            from: 'Biblioteca <jucaviza6@gmail.com>', // Cambiar por tu correo
            to: user.email, // El correo del usuario que hizo el préstamo
            subject: 'Confirmación de préstamo',
            text: `Hola ${user.name}, has hecho un préstamo de "${book.title}" por 14 días. 
            Fecha de devolución: ${formattedDate}. Gracias por utilizar nuestra biblioteca.`
          };

          // Enviar correo electrónico al usuario
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            else console.log('Email enviado: ' + info.response);
          });

          // Responder con un mensaje de éxito
          res.status(201).json({ message: 'Loan created successfully', loan });
        });
      });
    });
  });
};




exports.updateLoan = (req, res) => {
  const loanId = req.params.id;
  const { returned } = req.body;

  Loan.findById(loanId)
    .populate('book')
    .exec((err, loan) => {
      if (err) return res.status(500).send(err);

      if (!loan) {
        return res.status(404).send({ message: 'Loan not found' });
      }

      loan.returned = returned;

      if (returned) {
        // Si el préstamo se ha devuelto, actualizar el libro
        Book.updateOne({ _id: loan.book._id }, { available: true, loan: null }, (err, result) => {
          if (err) return res.status(500).send(err);

          console.log(`Updated ${result.nModified} book`);

          // Guardar la actualización del préstamo
          loan.save((err, updatedLoan) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(updatedLoan);
          });
        });
      } else {
        // Si el préstamo no se ha devuelto, solo guardar la actualización del préstamo
        Book.updateOne({ _id: loan.book._id }, { available: false, loan: loan._id }, (err, result) => {
          if (err) return res.status(500).send(err);

          console.log(`Updated ${result.nModified} book`);
        });
        loan.save((err, updatedLoan) => {
          if (err) return res.status(500).send(err);
          res.status(200).json(updatedLoan);
        });
        };
  });
};



/* exports.updateLoan = (req, res) => {
  Loan.findByIdAndUpdate(req.params.id, req.body, (err, loan) => {
    if (err) res.status(500).send(err);
    res.status(200).json(loan);
  });
}; */

exports.deleteLoan = (req, res) => {
  Loan.findByIdAndDelete(req.params.id, (err) => {
    if (err) res.status(500).send(err);
    res.status(204).send();
  });
};