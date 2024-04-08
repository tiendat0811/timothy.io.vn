const Setting = require('../models/setting');
// general
exports.setting = async (req, res) => {
    try {
        const title = "Cài đặt";
        const setting = await Setting.findOne();
        res.render('admin/index', { title, page: './setting/index.ejs', setting: setting });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.settingUpdate = async (req, res) => {

    try {
        const setting = await Setting.findOne();
        const { logo, contact, banner, slider, social, banking, about, payment, shipping, warranty, returning, security } = req.body;
        //create new data from body if not undefined
        const newData = {
            logo: logo ? logo : setting.logo,
            contact: contact ? contact : setting.contact,
            banner: banner ? banner : setting.banner,
            slider: slider ? slider : setting.slider,
            social: social ? social : setting.social,
            banking: banking ? banking : setting.banking,
            about: about ? about : setting.about,
            payment: payment ? payment : setting.payment,
            shipping: shipping ? shipping : setting.shipping,
            warranty: warranty ? warranty : setting.warranty,
            returning: returning ? returning : setting.returning,
            security: security ? security : setting.security,
        }
        const updatedSetting = await Setting.findByIdAndUpdate(
            setting._id,
            {
                $set: newData
            },
            { new: true }
        );
        res.status(201).json({ message: 'Updated successfully', status: 'ok', setting: updatedSetting });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// banking
exports.banking = async (req, res) => {
    try {
        const title = "Quản lý ngân hàng";
        const setting = await Setting.findOne();
        res.render('admin/index', { title, page: './setting/banking.ejs', setting: setting });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// slider
exports.slider = async (req, res) => {
    const title = "Quản lý quảng cáo";
    res.render('admin/index', { title, page: './setting/slider.ejs' });
}

// banner
exports.banner = async (req, res) => {
    const title = "Banner";
    res.render('admin/index', { title, page: './setting/banner.ejs' });
}

// about
exports.about = async (req, res) => {
    const title = "Giới thiệu";
    res.render('admin/index', { title, page: './setting/about.ejs' });
}

//payment
exports.payment = async (req, res) => {
    const title = "Phương thức thanh toán";
    res.render('admin/index', { title, page: './policy/payment.ejs' });
}

//shipping
exports.shipping = async (req, res) => {
    const title = "Phương thức vận chuyển";
    res.render('admin/index', { title, page: './policy/shipping.ejs' });
}

//maintenance
exports.warranty = async (req, res) => {
    const title = "Chính sách bảo trì";
    res.render('admin/index', { title, page: './policy/warranty.ejs' });
}

//returning
exports.returning = async (req, res) => {
    const title = "Chính sách đổi trả";
    res.render('admin/index', { title, page: './policy/returning.ejs' });
}

//security
exports.security = async (req, res) => {
    const title = "Chính sách bảo mật";
    res.render('admin/index', { title, page: './policy/security.ejs' });
}
