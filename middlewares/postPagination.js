// middlewares\pagination.js
const Post = require('../models/post');
const postPagination = () => {
    return async (req, res, next) => {
        const category = req.query.category
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = {};

        try {
            if (endIndex < await Post.countDocuments().exec()) {
                data.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (startIndex > 0) {
                data.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            // if dont have category get all post
            if (!category) {
                let total = await Post.countDocuments().exec();
                data.count = total;
                data.data = await Post.find().sort({ createdAt: -1 }).limit(limit).skip(startIndex).exec();
                res.paginatedResults = data;
                return next();
            } else {
                let total = await Post.countDocuments({
                    category: category
                }).exec();
                data.count = total;
                data.data = await Post.find({
                    category: category
                }).sort({ createdAt: -1 }).limit(limit).skip(startIndex).exec();
                res.paginatedResults = data;
                next();
            }
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = postPagination;