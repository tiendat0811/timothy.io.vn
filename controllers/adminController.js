exports.index = (req, res) => {
    const title = "Quản lý";
    res.render('admin/index', { title, page: 'dashboard.ejs' });
}

// category
exports.categories = (req, res) => {
    const title = "Quản lý danh mục";
    res.render('admin/index', { title, page: 'category.ejs' });
}

// product
exports.products = (req, res) => {
    const title = "Quản lý sản phẩm";
    res.render('admin/index', { title, page: 'product.ejs' });
}

// order
exports.orders = (req, res) => {
    const title = "Quản lý đơn hàng";
    res.render('admin/index', { title, page: 'order.ejs' });
}

// post
exports.posts = (req, res) => {
    const title = "Quản lý bài viết";
    res.render('admin/index', { title, page: 'post.ejs' });
}

// user
exports.users = (req, res) => {
    const title = "Quản lý người dùng";
    res.render('admin/index', { title, page: 'user.ejs' });
}
