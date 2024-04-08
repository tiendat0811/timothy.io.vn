const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.index);

router.get('/about', homeController.about);

router.get('/contact', homeController.contact);

// policy
router.get('/policy', homeController.policy);

router.get('/policy/phuong-thuc-thanh-toan', homeController.paymentPolicy);

router.get('/policy/phuong-thuc-van-chuyen', homeController.shippingPolicy);

router.get('/policy/chinh-sach-bao-hanh', homeController.warrantyPolicy);

router.get('/policy/chinh-sach-doi-tra', homeController.returnPolicy);

router.get('/policy/chinh-sach-bao-mat', homeController.securityPolicy);

router.get('/site-map-YZQJVLHZ', homeController.sitemap);
router.get('*', (req, res) => {
    // Xử lý logic tại đây, ví dụ:
    res.render('partials/empty', { title: 'Không tìm thấy' });
});

module.exports = router;
