const Review = require('../models/Review');
const Product = require('../models/Product');

exports.createReview = async (req, res) => {
    try {
        const { rating, comment, user, product } = req.body

        if (!rating || !comment || !user || !product) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const newReview = new Review({ rating, comment, user, product });
        await newReview.save();

        const productToUpdate = await Product.findById(product);
        if (!productToUpdate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        productToUpdate.reviews.push(newReview._id);
        await productToUpdate.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewsByProductId = async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId).populate({
            path: 'reviews',
            populate: { path: 'user', select: 'name' }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};