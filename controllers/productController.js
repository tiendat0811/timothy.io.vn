// controllers/productController.js
const Product = require('../models/product');
const Category = require('../models/category');
//middleware check token
const moment = require('moment');
var slugify = require('slugify')
// render actions
exports.render = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.query.category });
        const title = category?.name.toUpperCase();
        const description = category?.description;
        const keywords = category?.keywords;
        res.render('product/index', { title: title, description: description, keywords: keywords });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// index actions
exports.index = async (req, res) => {
    return res.json({ data: res.paginatedResults })
}

// create product actions
exports.create = async (req, res) => {
    const title = "Tạo sản phẩm mới";
    res.render('product/create', { title: title });
}

// store product actions
exports.store = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            createdDate: moment().format('MM/DD/YYYY, hh:mm:ss'),
            createdAt: moment().valueOf(),
            updatedDate: moment().format('MM/DD/YYYY, hh:mm:ss'),
            updatedAt: moment().valueOf(),
            slug: slugify(req.body.name, { locale: 'vi', lower: true })
        });
        await product.save();
        res.status(201).json({ data: product, message: 'Created successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// show product actions
exports.detail = async (req, res) => {
    try {

        // find product by slug
        const data = await Product.aggregate([
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
                $match: { slug: req.params.slug }
            },
            {
                $limit: 1
            },
        ]).exec();

        const product = data[0];
        if (!product) {
            return res.redirect('/notfound');
        }
        const title = product.name;
        let description = '';
        product.description.forEach(element => {
            if (typeof element.insert === 'string') {
                description += element.insert
            }
        });
        const keywords = product.keywords;
        res.render('product/detail', { title: title, product: product, description: description, keywords: keywords });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// update product actions
exports.update = async (req, res) => {
    try {
        const body = {
            ...req.body,
            updatedDate: moment().format('MM/DD/YYYY, hh:mm:ss'),
            updatedAt: moment().valueOf(),

        };
        if (req.body.keywords !== undefined) {
            body.keywords = req.body.keywords
        }
        if (req.body.quantity === 0 && req.body.status === 'active') {
            body.status = 'soldout';
        } else if (req.body.quantity > 0 && req.body.status === 'soldout') {
            body.status = 'active';
        }
        await Product.findOneAndUpdate({ slug: req.params.slug }, body);
        const updatedProduct = await Product.findOne({ slug: req.params.slug });
        res.status(201).json({ product: updatedProduct, message: 'Updated successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


// delete product actions
exports.delete = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Deleted successfully', status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};