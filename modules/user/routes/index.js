const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../../../middleware/auth');

// Permitir que cualquiera cree un nuevo usuario
router.post('/', userController.createUser);

// Ruta para verificar a los usuarios recien creados
router.get('/verified', userController.verifyUser);

// Rutas para que los usuarios de rol "commenter" puedan ver y editar su propio usuario
router.get('/me', auth.auth, userController.getSelf);
router.put('/me', auth.auth, userController.updateSelf);

// Rutas para que los usuarios de rol "admin" puedan ver, editar y eliminar a todos los usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', auth.admin, userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Rutas para modificar la lista de me gusta
router.get('/likes/:bookId', auth.auth, userController.addLike);
router.delete('/likes/:bookId', auth.auth, userController.removeLike);

module.exports = router;