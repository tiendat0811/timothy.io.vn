// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

// Lấy trang đăng ký
exports.getRegister = (req, res) => {
    const errorFlash = req.flash('error');
    const successFlash = req.flash('success');
    res.render('auth/register', {
        title: 'Đăng ký', flash: {
            error: errorFlash,
            success: successFlash
        }
    });
};

exports.postRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Chuyển hướng về trang đăng ký với thông báo lỗi
            req.flash('error', 'Người dùng đã tồn tại');
            return res.redirect('/auth/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();

        // Chuyển hướng về trang đăng nhập với thông báo thành công
        req.flash('success', 'Đăng ký thành công');
        return res.redirect('/auth/register');
    } catch (error) {
        console.log(error)
        req.flash('error', 'Đăng ký thất bại');
        res.redirect('/auth/register');
    }
};


// Cấu hình Passport LocalStrategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            // Tìm người dùng trong cơ sở dữ liệu theo email
            const user = await User.findOne({ email });

            // Kiểm tra người dùng
            if (!user) {
                return done(null, false, { message: 'Email hoặc mật khẩu không đúng' });
            }

            // So sánh mật khẩu
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    // Mật khẩu khớp, tạo token
                    const token = jwt.sign({ _id: user._id, data: user }, 'paulight8888', { expiresIn: '120m' });

                    return done(null, user, { token });
                } else {
                    // Mật khẩu không khớp, trả về thông báo lỗi
                    return done(null, false, { message: 'Email hoặc mật khẩu không đúng' });
                }
            });

        } catch (error) {
            return done(error);
        }
    }
));

// Cấu hình Passport serialization và deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});



//Lấy trang đăng nhập
exports.getLogin = (req, res) => {
    const errorFlash = req.flash('error');

    // render login without expressLayout

    res.render('auth/login', {
        title: 'Đăng nhập',
        flash: {
            error: errorFlash,
        },

    });
}

// Đăng nhập người dùng
exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        // Đăng nhập thành công
        req.logIn(user, (err) => {
            if (err) {

                return next(err);
            }
            res.cookie('token', info.token, { maxAge: 60 * 60 * 1000 }); // Cookie hết hạn sau 60 phút (60 * 60 * 1000 ms)
            return res.status(200).json({ user: user });
        });
    })(req, res, next);
}

// Đăng xuất người dùng
exports.logout = (req, res) => {
    req.logout(function (err) {
        //delete cookies
        res.clearCookie('token');

        // Xóa cơ sở dữ liệu IndexedDB


        if (err) { return next(err); }
        res.redirect('/');
    });
}
