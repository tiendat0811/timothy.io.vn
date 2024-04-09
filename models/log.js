const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    msnv: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    actions: {
        type: Array,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;