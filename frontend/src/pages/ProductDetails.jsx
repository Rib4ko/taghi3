import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createOrder } from '../api/order';
import { getProductById } from '../api/products';
import { getUser } from '../api/user';
import { createReview, getReviewsByProductId } from '../api/review';
import defaultImage from '../assets/default.jpg';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getUser();

    // State declarations
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState({
        street: '',
        city: '',
        country: ''
    });
    const [reviewInput, setReviewInput] = useState({
        rating: '5',
        comment: ''
    });
    const [errors, setErrors] = useState({
        message: '',
        review: ''
    });

    // Fetch product and reviews
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, reviewsData] = await Promise.all([
                    getProductById(id),
                    getReviewsByProductId(id)
                ]);
                
                setProduct(productData);
                setReviews(reviewsData);
                
                // Check wishlist status
                const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                setIsAddedToWishlist(wishlist.some(p => p.productId === id));
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [id]);

    // Order handling
    const handleOrder = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                product: id,
                user: user?.id,
                quantity,
                address,
                paymentMethod: "cash",
                totalAmount: product.price * quantity
            };
            
            await createOrder(orderData);
            navigate('/order-success');
        } catch (error) {
            console.error('Order failed:', error);
            setErrors(prev => ({ ...prev, message: 'Order failed. Please try again.' }));
        }
    };

    // Cart handling
    const handleCart = (e) => {
        e.preventDefault();
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingIndex = cart.findIndex(item => item.productId === id);

            if (existingIndex !== -1) {
                cart[existingIndex].quantity += quantity;
                cart[existingIndex].address = address;
            } else {
                cart.push({
                    productId: id,
                    quantity,
                    address
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert("Product added to cart");
        } catch (error) {
            console.error('Cart update failed:', error);
        }
    };

    // Wishlist handling
    const handleWishlist = (e) => {
        e.preventDefault();
        if (!user) {
            setErrors(prev => ({ ...prev, message: 'Please log in to manage wishlist' }));
            return;
        }

        try {
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            const existingIndex = wishlist.findIndex(p => p.productId === id);

            if (existingIndex !== -1) {
                wishlist.splice(existingIndex, 1);
                setIsAddedToWishlist(false);
                alert('Removed from wishlist');
            } else {
                wishlist.push({ productId: id });
                setIsAddedToWishlist(true);
                alert('Added to wishlist');
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setErrors(prev => ({ ...prev, message: '' }));
        } catch (error) {
            console.error('Wishlist update failed:', error);
        }
    };

    // Review handling
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setErrors(prev => ({ ...prev, review: 'You must be logged in to review' }));
            return;
        }

        try {
            await createReview({
                product: id,
                user: user.id,
                ...reviewInput
            });

            const updatedReviews = await getReviewsByProductId(id);
            setReviews(updatedReviews);
            setReviewInput({ rating: '5', comment: '' });
            setErrors(prev => ({ ...prev, review: '' }));
        } catch (err) {
            setErrors(prev => ({ ...prev, review: 'Review submission failed' }));
        }
    };

    // Handle input changes
    const handleAddressChange = (e) => {
        const { id, value } = e.target;
        setAddress(prev => ({ ...prev, [id]: value }));
    };

    const handleReviewChange = (e) => {
        const { id, value } = e.target;
        setReviewInput(prev => ({ ...prev, [id]: value }));
    };

    if (!product) {
        return <div className="text-center py-8">Loading product details...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Product Header */}
                <div className="p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        {product.title}
                    </h1>
                    
                    {/* Product Image */}
                    <div className="mb-6 flex justify-center">
                        <img 
                            src={product.image || defaultImage} 
                            alt={product.title}
                            className="w-full max-w-md h-64 sm:h-80 object-contain rounded-lg"
                        />
                    </div>
                    
                    {/* Product Info */}
                    <div className="mb-6">
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Description:</span> {product.description}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Price:</span> {product.price}€
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Category:</span> {product.category}
                        </p>
                    </div>
                    
                    {/* Error Messages */}
                    {errors.message && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.message}
                        </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button 
                            onClick={handleWishlist}
                            className={`px-4 py-2 rounded font-medium ${
                                isAddedToWishlist 
                                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                        >
                            {isAddedToWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                    
                    {/* Order Form */}
                    <form onSubmit={handleOrder} className="space-y-4 mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="quantity" className="block text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            
                            {['street', 'city', 'country'].map(field => (
                                <div key={field}>
                                    <label htmlFor={field} className="block text-gray-700 mb-1 capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        value={address[field]}
                                        onChange={handleAddressChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
                            >
                                Order Now
                            </button>
                            <button 
                                type="button" 
                                onClick={handleCart}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-medium"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </form>
                    
                    {/* Reviews Section */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                        
                        {reviews.length > 0 ? (
                            <div className="space-y-4">
                                {reviews.map(review => (
                                    <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                        )}
                        
                        {/* Review Form */}
                        {user && (
                            <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
                                <h3 className="text-lg font-medium">Write a Review</h3>
                                
                                {errors.review && (
                                    <div className="text-red-500 text-sm">{errors.review}</div>
                                )}
                                
                                <div>
                                    <label htmlFor="rating" className="block text-gray-700 mb-1">
                                        Rating
                                    </label>
                                    <select
                                        id="rating"
                                        value={reviewInput.rating}
                                        onChange={handleReviewChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    >
                                        {[5,4,3,2,1].map(num => (
                                            <option key={num} value={num}>
                                                {num} Star{num !== 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label htmlFor="comment" className="block text-gray-700 mb-1">
                                        Comment
                                    </label>
                                    <textarea
                                        id="comment"
                                        value={reviewInput.comment}
                                        onChange={handleReviewChange}
                                        rows="3"
                                        className="w-full p-2 border border-gray-300 rounded"
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
                                >
                                    Submit Review
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;