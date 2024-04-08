const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Setting = require('../models/setting');
const Category = require('../models/category');
// Kiểm tra token
const checkToken = (req, res, next) => {
    const cookies = req.cookies; // Lấy danh sách cookies
    const token = cookies.token; // Lấy giá trị của cookie có tên "token"

    if (!token) {
        console.log('Không có token');
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, 'paulight8888'); // Giải mã token

        // Lưu thông tin user vào req để sử dụng trong các controller
        req.user = decoded;

        next(); // Tiếp tục xử lý các tác vụ trong route hoặc chuyển tới route tiếp theo
    } catch (error) {
        console.log(error);
        return res.redirect('/auth/login');
    }
};

const getUser = async (req, res, next) => {

    res.locals.title = title;
    res.locals.description = description;
    res.locals.keywords = keywords;
    const cookies = req.cookies;
    const token = cookies.token;
    //get Setting
    try {
        const setting = await Setting.findOne();
        if (setting) {
            res.locals.setting = setting;
        } else {
            res.locals.setting = null;
        }
    } catch (error) {
        console.log(error)
        res.locals.setting = null;
    }
    //get Category
    try {
        const categories = await Category.find();
        if (categories) {
            res.locals.categories = categories;
        } else {
            res.locals.categories = null;
        }
    } catch (error) {
        console.log(error)
        res.locals.categories = null;
    }

    // handle data for header
    if (token) {
        try {
            const decoded = jwt.verify(token, 'paulight8888');
            let userData = decoded.data;
            delete userData.password;
            delete userData.__v;
            delete userData._id;
            res.locals.user = userData;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // Token has expired
                res.locals.user = null;
            } else {
                // Other error occurred during token verification
                res.locals.user = null;
                console.error('Error verifying token:', error);
            }
        }
    } else {
        res.locals.user = null;
    }

    next();
}

const checkRole = (roles) => {
    return (req, res, next) => {
        const cookies = req.cookies; // Lấy danh sách cookies
        const token = cookies.token; // Lấy giá trị của cookie có tên "token"
        const decoded = jwt.verify(token, 'paulight8888'); // Giải mã token
        if (roles.includes(decoded.data.role) || decoded.data.role == 'dev') {
            next();
        } else {
            return res.redirect('/notfound');
        }
    }
}
const keywords = [
    "FSL VIỆT NAM",
    "Đèn led giá sỉ",
    "Đèn led giá bán buôn",
    "đại lý đèn led",
    "đại lý thiết bị điện",
    "đại lý đèn led fsl",
    "ĐÈN LED FSL chính hãng",
    "LED",
    "FSL",
    "Đèn LED",
    "ĐÈN LED FSL",
    "Công ty Cổ phần An Phát Sài Gòn",
    "đại lý đèn LED",
    "đèn LED FSL",
    "đèn poli",
    "đèn trang trí",
    "đèn công trình",
    "đèn gia đình",
    "bóng đèn LED",
    "tiết kiệm năng lượng",
    "đèn chiếu sáng ngoài trời",
    "đèn trần",
    "đèn treo tường",
    "đèn LED thông minh",
    "đèn LED chất lượng",
    "đèn LED an toàn",
    "đèn LED bền vững",
    "đèn LED tiết kiệm điện",
    "FSL LED",
    "đèn LED giá rẻ",
    "đèn LED chính hãng",
    "đèn LED nhập khẩu",
    "đèn LED phong cách",
    "đèn LED hiện đại",
    "đèn LED sáng tiết kiệm",
    "đèn LED hiệu suất cao",
    "đèn LED tiêu chuẩn quốc tế",
    "led fsl",
    "led lighting fsl",
    "led lighting"
]

const description = "FSL VIỆT NAM - ĐÈN LED FSL chính hãng. Website chính thức của thương hiệu chiếu sáng FSL LED Lighting tại Việt Nam. Công ty Cổ Phần TBĐ An Phát Sài Gòn tự hào là nhà phân phối độc quyền các sản phẩm chính hãng của FSL tại Việt Nam. MỜI HỢP TÁC - Mobile: 0964 090 616(Zalo)"

const title = "FSL VIỆT NAM - ĐÈN LED FSL chính hãng"
module.exports = {
    checkToken,
    getUser,
    checkRole
};