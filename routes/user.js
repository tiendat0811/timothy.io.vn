const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const User = require('../models/user');

router.get('/', userController.index);

router.get('/index', userController.index);

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

module.exports = router;