const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { checkRole } = require('../middlewares/auth');

// GET /category
router.get('/', categoryController.index);

// POST /category/store
router.post('/', checkRole(['admin', 'mod']), categoryController.store);

// GET /category/:id
router.get('/:slug', categoryController.detail);

// PUT /category/:id
router.put('/:id', checkRole(['admin', 'mod']), categoryController.update);

// DELETE /category/:id
router.delete('/:id', checkRole(['admin', 'mod']), categoryController.delete);

module.exports = router;


