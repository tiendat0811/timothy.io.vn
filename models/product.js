const mongoose = require('mongoose');
const Category = require('./category');
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        categorySlug: {
            type: String,
        },
        description: {
            type: Array,
        },
        price: {
            type: Number,
            required: true
        },
        detail: {
            type: Array,
        },
        images: {
            type: Array,
        },
        discount: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'soldout'],
            default: 'active'
        },
        createdDate: {
            type: String,
            required: true
        },
        createdAt: {
            type: Number,
            required: true,
        },
        updatedDate: {
            type: String,
            required: true
        },
        updatedAt: {
            type: Number,
            required: true,
        },
        keywords: {
            type: String,
            default: ''
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

productSchema.virtual('category', {
    ref: 'Category',
    localField: 'categorySlug',
    foreignField: 'slug',
    justOne: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;