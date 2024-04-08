const mongoose = require('mongoose');
const moment = require('moment');

const bankingSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    locale: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },

});

const socialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});

const sliderSchema = new mongoose.Schema({
    position: {
        type: Number,
    },
    name: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const settingSchema = new mongoose.Schema({
    banner: {
        type: [sliderSchema],
        default: []
    },
    logo: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cvaaOFlNmuFFxQp2W5XkZAYwgSROANb8PQPyAUkEIw&s'
    },
    slider: {
        type: [sliderSchema],
        default: [

        ]
    },
    contact: {
        type: {
            address: String,
            phone: String,
            email: String
        },
        default: {
            address: 'Quận 3, TP. HCM',
            phone: '0903684049',
            email: 'phamtiendat.dev@gmail.com'
        }
    },
    banking: {
        type: [bankingSchema],
        default: [

        ]
    },
    social: {
        type: [socialSchema],
        default: [
            {
                name: 'Zalo',
                link: 'https://zalo.me/0903684049',
                image: 'https://firebasestorage.googleapis.com/v0/b/vnbay-3bd29.appspot.com/o/zalo-icon.png?alt=media&token=5058be08-278d-4e55-af79-4b4880ba0c7f'
            }
        ]
    },
    visitorCount: {
        type: Number,
        default: 0
    },
    about: {
        type: Array,
        default: []
    },
    payment: {
        type: Array,
        default: []
    },
    shipping: {
        type: Array,
        default: []
    },
    warranty: {
        type: Array,
        default: []
    },
    returning: {
        type: Array,
        default: []
    },
    security: {
        type: Array,
        default: []
    },
});

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting

try {
    // init setting
    Setting.findOne().then((setting) => {
        if (!setting) {
            const setting = new Setting();
            setting.save();
        }
    }).catch((e) => {
        console.log(e);
    })
} catch (error) {
    console.log(error)
}