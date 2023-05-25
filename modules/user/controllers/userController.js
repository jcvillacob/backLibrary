const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const fs = require('fs');


/// OBTENER TODOS LOS USUARIOS ///////////////
exports.getAllUsers = async (req, res) => {
  try {
    let filter = {};

    const users = await User.find(filter);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};


/// OBTENER UN SOLO USUARIOS ///////////////
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


/// OBTENER USUARIO PROPIO ///////////////
exports.getSelf = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


/// CREAR UN NUEVO USUARIOS ///////////////
exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();

    // Crear y firmar el token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '3h' });
    console.log(token); // Imprimir el token en la consola

    // Enviar notificación por email al usuario
    const template = fs.readFileSync('modules/user/controllers/verify.html', 'utf8');
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'jucaviza6@gmail.com', // Cambiar por tu correo
        pass: 'qxqqnwychkajbfzs' // Cambiar por tu contraseña
      },
    });

    const html = template.replace(/{{userName}}/g, user.name).replace(/{{token}}/g, token);

    const mailOptions = {
      from: 'Biblioteca <jucaviza6@gmail.com>', // Cambiar por tu correo
      to: user.email, // El correo del usuario que se registró
      subject: 'Confirmación de registro',
      html: html,
    };

    // Enviar correo electrónico al usuario
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log('Email enviado: ' + info.response);
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


/// VERIFICAR USUARIO ///////////////
exports.verifyUser = async (req, res) => {
  const token = req.query.t;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Actualizar el campo "verified" del usuario correspondiente
    const user = await User.findByIdAndUpdate(decoded.userId, { verified: true });

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.status(200).send('Usuario verificado correctamente');
  } catch (err) {
    res.status(401).send('Token inválido o expirado');
  }
};


/// ACTUALIZAR USUARIO ///////////////
exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);
      req.body.password = passwordHash;
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};


/// ACTUALIZAR USUARIO PROPIO ///////////////
exports.updateSelf = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);
      req.body.password = passwordHash;
    }
    const user = await User.findByIdAndUpdate(req.userData.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


/// ELIMINAR USUARIO ///////////////
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};


/// AÑADIR LIBRO A LISTA DE ME GUSTA ///////////////
exports.addLike = async (req, res) => {
  const id = req.userData.userId;
  const { bookId } = req.params;

  try {
    const user = await User.findById(id);
    if (!user.likes.includes(bookId)) {
      user.likes.push(bookId);
      await user.save();
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


/// ELIMINAR LIBRO DE LISTA DE ME GUSTA ///////////////
exports.removeLike = async (req, res) => {
  const id = req.userData.userId;
  const { bookId } = req.params;

  try {
    const user = await User.findById(id);
    const index = user.likes.indexOf(bookId);
    if (index > -1) {
      user.likes.splice(index, 1);
      await user.save();
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};