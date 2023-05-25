const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const auth = require('../../../middleware/auth');

router.post('/', loanController.createLoan);

// Rutas para que los usuarios puedan consultar sus propios préstamos
router.get('/me', auth.auth, loanController.getSelf);

router.get('/', loanController.getAllLoans);
router.get('/:id', loanController.getLoanById);
router.put('/:id', loanController.updateLoan);
router.delete('/:id', loanController.deleteLoan);

module.exports = router;