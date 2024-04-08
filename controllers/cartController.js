exports.index = async (req, res) => {
    res.render('cart/index', {
        title: 'Giỏ hàng'
    });
}