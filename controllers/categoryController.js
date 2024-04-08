// controllers/categoryController.js
const Category = require('../models/category');

exports.index = async (req, res) => {
    try {
        let categories = await Category.find();
        return res.json({ data: categories });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.store = async (req, res) => {
    try {
        const category = new Category({
            ...req.body
        });
        await category.save();
        return res.status(201).json({ data: category, message: 'Created successfully', status: 'ok' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.detail = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) {
            return res.redirect('/notfound');
        }
        return res.json({ data: category });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const body = {
            ...req.body,
        };
        const category = await Category.findByIdAndUpdate(req.params.id, body);
        await category.save();
        res.status(201).json({ category: category, message: 'Updated successfully', status: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Deleted successfully', status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

