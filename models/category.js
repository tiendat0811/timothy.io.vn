const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    keywords: {
        type: String,
        default: ''
    },
});


const Category = mongoose.model('Category', categorySchema);


// add default data
const categories = [

]
try {
    Category.findOne().then(category => {
        if (!category) {
            Category.insertMany(categories)
        }
    })
} catch (error) {
    console.log(error)
}
module.exports = Category;