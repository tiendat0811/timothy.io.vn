const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const settingController = require('../controllers/settingController');
const { checkRole } = require('../middlewares/auth');
router.get('/', adminController.index);

// category
router.get('/category', checkRole(['admin']), adminController.categories);

// product
router.get('/product', checkRole(['admin']), adminController.products);

// order
router.get('/order', checkRole(['admin']), adminController.orders);

// post
router.get('/post', adminController.posts);

// user
router.get('/user', checkRole(['admin']), adminController.users);

// setting
router.get('/setting', checkRole(['admin']), settingController.setting);

router.patch('/setting', checkRole(['admin']), settingController.settingUpdate);

// setting - banking
router.get('/setting/banking', checkRole(['admin']), settingController.banking);

// setting - slider
router.get('/setting/slider', checkRole(['admin']), settingController.slider);

// setting - banner
router.get('/setting/banner', checkRole(['admin']), settingController.banner);

// setting - about
router.get('/setting/about', checkRole(['admin']), settingController.about);

// policy - payment
router.get('/policy/payment', checkRole(['admin']), settingController.payment);

// policy - shipping
router.get('/policy/shipping', checkRole(['admin']), settingController.shipping);

// policy - maintenance
router.get('/policy/warranty', checkRole(['admin']), settingController.warranty);

// policy - returning
router.get('/policy/returning', checkRole(['admin']), settingController.returning);

// policy - security
router.get('/policy/security', checkRole(['admin']), settingController.security);

router.get('/*', (req, res) => {
    // Xử lý logic tại đây, ví dụ:
    res.render('partials/empty', { title: 'Không tìm thấy' });
});

module.exports = router;