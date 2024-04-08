// middlewares\pagination.js
const Product = require('../models/product');
const productPagination = () => {
    return async (req, res, next) => {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const status = req.query.status
        const search = req.query.search;
        const category = req.query.category ? Array.isArray(req.query.category) ? req.query.category : [req.query.category] : []
        let categoryIN = []
        if (category.length === 0) {

        } else if (category.length === 1) {
            categoryIN.push(category[0])
        } else {
            category.map((item, index) => {
                categoryIN.push(item)
            })
        }

        const price = req.query.price ? Array.isArray(req.query.price) ? req.query.price : [req.query.price] : []
        let priceIN = []
        if (price.length === 0) {
            priceIN.push({ price: { $gte: 0, $lte: 100000000 } })
        } else if (price.length === 1) {
            let prices = price[0].split('to')
            priceIN.push({ price: { $gte: parseInt(prices[0]), $lte: parseInt(prices[1]) } })
        } else {
            price.map((item, index) => {
                let prices = item.split('to')
                priceIN.push({ price: { $gte: parseInt(prices[0]), $lte: parseInt(prices[1]) } })
            })
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = {};

        try {
            if (endIndex < await Product.countDocuments().exec()) {
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
            let total = await Product
                .aggregate([
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'categorySlug',
                            foreignField: 'slug',
                            as: 'category'
                        }
                    },
                    {
                        $unwind: '$category'
                    },
                    {
                        $match: {
                            $and: [
                                // Lọc theo các điều kiện cũ
                                { 'category.slug': categoryIN.length > 0 ? { $in: categoryIN } : { $ne: null } },
                                { 'status': status ? status : { $ne: null } },
                                { 'name': search ? { $regex: search, $options: 'i' } : { $ne: null } },
                                // Thêm điều kiện lọc theo giá
                                { $or: priceIN } // Hoặc là một trong các khoảng giá được chọn
                            ]
                        }
                    },
                    {
                        $count: 'totalCount' // Thêm giải cụ totalcount để lưu kết quả đếm
                    }
                ])
                .exec();
            // create populate array from filter object
            let result = await Product
                .aggregate([
                    {
                        $lookup: {
                            from: 'categories',
                            localField: 'categorySlug',
                            foreignField: 'slug',
                            as: 'category'
                        }
                    },
                    {
                        $unwind: '$category'
                    },
                    {
                        $match: {
                            $and: [
                                { 'category.slug': categoryIN.length > 0 ? { $in: categoryIN } : { $ne: null } },
                                { 'status': status ? status : { $ne: null } },
                                { 'name': search ? { $regex: search, $options: 'i' } : { $ne: null } },
                                // Thêm điều kiện lọc theo giá
                                { $or: priceIN } // Hoặc là một trong các khoảng giá được chọn
                            ]
                        }
                    },
                    {
                        $sort: {
                            [sort]: order === 'desc' ? -1 : 1
                        }
                    },
                    {
                        $skip: startIndex
                    },
                    {
                        $limit: limit
                    },

                ])
                .exec();
            data.count = total[0]?.totalCount || 0;
            data.data = result;
            res.paginatedResults = data;
            next();

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = productPagination;