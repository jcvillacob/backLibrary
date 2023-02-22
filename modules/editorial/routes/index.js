const express = require('express');
const router = express.Router();
const editorialController = require('../controllers/editorialController');

router.get('/', editorialController.getAllEditorials);
router.get('/:id', editorialController.getEditorialById);
router.post('/', editorialController.createEditorial);
router.put('/:id', editorialController.updateEditorial);
router.delete('/:id', editorialController.deleteEditorial);

module.exports = router;