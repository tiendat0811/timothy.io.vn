// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET trang đăng ký
router.get('/register', authController.getRegister);

// POST đăng ký
router.post('/register', authController.postRegister);

// GET trang đăng nhập
router.get('/login', authController.getLogin);

// Đăng nhập người dùng
router.post('/login', authController.postLogin);

// Đăng xuất người dùng
router.get('/logout', authController.logout);

router.get('/*', (req, res) => {
    // Xử lý logic tại đây, ví dụ:
    res.render('partials/empty', { title: 'Không tìm thấy' });
});

module.exports = router;
