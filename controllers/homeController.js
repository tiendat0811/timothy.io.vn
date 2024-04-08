// Hàm xử lý cho route '/'
let webTitle = 'Mai Linh Driver'
exports.index = (req, res) => {
    const title = webTitle;
    // Render view 'index' và truyền các biến dữ liệu
    res.render('home/index', { title: title });
};

exports.about = (req, res) => {
    const title = "Giới thiệu - " + webTitle;

    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/about', { title: title });
}

exports.contact = (req, res) => {
    const title = "Liên hệ - " + webTitle;

    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/contact', { title: title });
}

exports.policy = (req, res) => {
    const title = "Quy định & Chính sách - " + webTitle;
    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/policy', { title: title });
}

exports.paymentPolicy = (req, res) => {
    const title = "Phương thức thanh toán - " + webTitle;
    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/policy', { title: title });
}

exports.shippingPolicy = (req, res) => {
    const title = "Chính sách vận chuyển - " + webTitle;
    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/policy', { title: title, page: 'shipping' });
}

exports.warrantyPolicy = (req, res) => {
    const title = "Chính sách bảo trì - " + webTitle;
    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/policy', { title: title, page: 'warranty' });
}

exports.returnPolicy = (req, res) => {
    const title = "Chính sách đổi trả - " + webTitle;
    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/policy', { title: title, page: 'returning' });
}

exports.securityPolicy = (req, res) => {
    const title = "Chính sách bảo mật - " + webTitle;
    // Render view 'index' và truyền các biến dữ liệu
    res.render('page/policy', { title: title, page: 'security' });
}

exports.sitemap = (req, res) => {
    res.sendFile('site-map.xml', { root: './views' });
}