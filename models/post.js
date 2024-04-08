const mongoose = require('mongoose');
const validCategories = [
    'news',
];

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: Array,
    },
    category: {
        type: String,
        enum: validCategories,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
// category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true
// },