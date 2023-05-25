const jwt = require('jsonwebtoken');
const User = require('../../user/models/userModel');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Usuario no Encontrado'
        });
      }
      if (user.rol !== 'Admin' && !user.verified) { // Verificar si el usuario está verificado, a menos que sea un Admin
        return res.status(401).json({
          message: 'Usuario no verificado'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Error al iniciar sesión'
          });
        };
        console.log('Result:', result);
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
              rol: user.rol,
              name: user.name,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        } else {
          return res.status(401).json({
            message: 'Authentication failed'
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
