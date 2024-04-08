const express = require('express');
const router = express.Router();

const mailinhController = require('../controllers/mailinhController');

router.get('/salary', mailinhController.salary);

router.get('/revenue', mailinhController.revenue);

router.get('/infostaff', mailinhController.infostaff);
module.exports = router;