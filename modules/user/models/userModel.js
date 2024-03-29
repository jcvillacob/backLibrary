const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  rol: {type: String, enum: ['user', 'admin'], default: 'user'},
  verified: {type: Boolean, default: false},
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

// Método pre-save para encriptar la contraseña
userSchema.pre('save', async function (next) {
  // Solo encripta si la contraseña ha sido modificada
  if (!this.isModified('password')) {
    return next();
  }
  try {
    // Generar una sal (hash aleatorio) y utilizarla para cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Reemplazar la contraseña sin cifrar con la cifrada
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);