// controllers/postController.js
const Post = require('../models/post');
const moment = require('moment');
var slugify = require('slugify')
// render actions
exports.render = async (req, res) => {
    try {
        const title = "Tin tức";
        const posts = await Post.find();
        res.render('post/index', { title: title, posts: posts });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// index actions
exports.index = async (req, res) => {
    return res.json({ data: res.paginatedResults })
}

// create post actions
exports.create = async (req, res) => {
    const title = "Tạo bài viết mới";
    res.render('post/create', { title: title });
}

// store post actions
exports.store = async (req, res) => {
    try {
        const post = new Post({
            ...req.body,
            createdDate: moment().format('MM/DD/YYYY, hh:mm:ss'),
            createdAt: moment().valueOf(),
            updatedAt: moment().format('MM/DD/YYYY, hh:mm:ss'),
            slug: slugify(req.body.title, { locale: 'vi', lower: true })
        });
        await post.save();
        res.status(201).json({ data: post, message: 'Created successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// show post actions
exports.detail = async (req, res) => {
    try {
        // find post by slug
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.redirect('/notfound');
        }
        const title = post.title;
        let description = ''
        post.description.forEach(element => {
            if (typeof element.insert === 'string') {
                description += element.insert
            }
        })
        res.render('post/detail', { title: title, post: post, description: description });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// edit post actions
exports.edit = async (req, res) => {
    try {
        const title = "Chỉnh sửa bài viết";
        const post = await Post.findById(req.params.id);
        res.render('post/edit', { title: title, post: post });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// update post actions
exports.update = async (req, res) => {
    try {
        const body = {
            ...req.body,
            updatedAt: moment().format('MM/DD/YYYY, hh:mm:ss'),
        };
        const post = await Post.findByIdAndUpdate(req.params.id, body);
        await post.save();
        res.status(201).json({ post: post, message: 'Updated successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


// delete post actions
exports.delete = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Deleted successfully', status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};