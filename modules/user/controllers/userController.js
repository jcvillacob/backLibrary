const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const fs = require('fs');


/////////////////////////////////////////////////////////////
exports.getAllUsers = async (req, res) => {
  try {
    let filter = {};

    const users = await User.find(filter);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};


/////////////////////////////////////////////////////////////
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


/////////////////////////////////////////////////////////////
exports.getSelf = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};


/////////////////////////////////////////////////////////////
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

    const html = template.replace('{{userName}}', user.name).replace('{{token}}', token);

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

/////////////////////////////////////////////////////////////
// Ruta para verificar el token y actualizar el campo "verified"
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


/////////////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////////////
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};