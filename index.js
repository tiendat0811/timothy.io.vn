const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();

// Thiết lập EJS làm template engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/static', express.static(path.join(__dirname, 'assets')));

// Cấu hình parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))

// Cấu hình session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Khởi tạo Passport
const flash = require('connect-flash');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Khai báo model
const users = require('./models/user')
const setting = require('./models/setting')
const post = require('./models/post')
const category = require('./models/category')

// Kết nối đến cơ sở dữ liệu MongoDB
console.log('process.env.MONGODB_URI', process.env.MONGODB_URI)
// const uri = process.env.MONGODB_URI || 'mongodb://timothypham:vnbaytimothy081101@mongodb:27017/paul?authSource=admin';
const uri = process.env.MONGODB_URI || 'mongodb://timothypham:vnbaytimothy081101@14.225.210.233/timothy-io-vn?authSource=admin';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công');
}).catch((error) => {
    console.error('Lỗi kết nối cơ sở dữ liệu:', error);
});

// Middleware xử lý dữ liệu đầu vào
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { checkToken, getUser, checkRole } = require('./middlewares/auth');

app.use(getUser);

// Sử dụng router
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

app.use('/admin', checkToken, checkRole(['admin', 'mod']), require('./routes/admin'))
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/post', require('./routes/post'))
// app.use('/category', require('./routes/category'))
// app.use('/product', require('./routes/product'))
// app.use('/cart', require('./routes/cart'))
app.use('/', require('./routes/home'));

// ...

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let onlineUsers = 0;

io.on('connection', (socket) => {
    // Mỗi khi có người dùng kết nối, tăng số người đang trực tuyến lên 1
    onlineUsers++;
    // Gửi số người đang trực tuyến đến tất cả các kết nối (clients)
    io.emit('onlineUsers', onlineUsers);
    socket.on('disconnect', () => {
        // Khi có người dùng ngắt kết nối, giảm số người đang trực tuyến đi 1
        onlineUsers--;
        // Gửi số người đang trực tuyến sau khi có người dùng ngắt kết nối
        io.emit('onlineUsers', onlineUsers);
    });

    // Tăng số lượt truy cập lên 1
    socket.on('visitorCount', () => {
        setting.findOneAndUpdate({}, { $inc: { visitorCount: 1 } }, { new: true }).then((setting) => {
            io.emit('visitorCount', setting.visitorCount);
        });
    });
});

const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
