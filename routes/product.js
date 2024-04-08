const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkRole } = require('../middlewares/auth');

//pagination
const productPagination = require('../middlewares/productPagination');

// GET /product
router.get('/', productController.render);

// GET /product/index
router.get('/index', productPagination(), productController.index);

// GET /product/create
router.get('/create', checkRole(['admin', 'mod']), productController.create);

// POST /product/store
router.post('/', checkRole(['admin', 'mod']), productController.store);

// GET /product/:id
router.get('/:slug', productController.detail);

// PUT /product/:id
router.put('/:slug', checkRole(['admin', 'mod']), productController.update);

// DELETE /product/:id
router.delete('/:slug', checkRole(['admin', 'mod']), productController.delete);

module.exports = router;