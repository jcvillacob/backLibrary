const express = require('express');
const router = express.Router();
const categController = require('../controllers/categController');

router.get('/', categController.getAllCategs);
router.get('/:id', categController.getCategById);
router.post('/', categController.createCateg);
router.put('/:id', categController.updateCateg);
router.delete('/:id', categController.deleteCateg);

module.exports = router;