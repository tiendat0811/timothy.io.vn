exports.index = (req, res, next) => {
    res.redirect('/')
}

exports.banking = async (req, res, next) => {
    const title = "Thông tin chuyển khoản"
    res.render('tool/banking', { title: title })
}

exports.checkingFlight = async (req, res, next) => {
    const title = "Kiểm tra chuyến bay"
    res.render('tool/checking-flight', { title: title })
};

exports.onlinePayment = async (req, res, next) => {
    const title = "Thanh toán online"
    res.render('tool/online-payment', { title: title })
}

exports.bookingGuide = async (req, res, next) => {
    const title = "Hướng dẫn đặt vé"
    res.render('tool/booking-guide', { title: title })
}

exports.faq = async (req, res, next) => {
    const title = "Câu hỏi thường gặp"
    res.render('tool/faq', { title: title })
}
