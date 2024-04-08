const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { checkRole } = require('../middlewares/auth');

//pagination
const postPagination = require('../middlewares/postPagination');

// GET /post
router.get('/', postController.render);

// GET /post/index
router.get('/index', postPagination(), postController.index);

// GET /post/create
router.get('/create', checkRole(['admin', 'mod']), postController.create);

// POST /post/store
router.post('/', checkRole(['admin', 'mod']), postController.store);

// GET /post/:id
router.get('/:slug', postController.detail);

// GET /post/:id/edit
router.get('/:id/edit', postController.edit);

// PUT /post/:id
router.put('/:id', checkRole(['admin', 'mod']), postController.update);

// DELETE /post/:id
router.delete('/:id', checkRole(['admin', 'mod']), postController.delete);

module.exports = router;