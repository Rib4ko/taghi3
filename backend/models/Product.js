const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;