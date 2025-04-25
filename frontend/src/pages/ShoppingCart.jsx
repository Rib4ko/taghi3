import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/user';
import { createOrder } from '../api/order';
import { getProduct } from '../api/products';
import Loading from '../components/Loading';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const fetchCartData = async () => {
            setLoading(true);
            try {
                const itemsWithDetails = await Promise.all(cart.map(async (item) => {
                    const product = await getProduct(item.productId);
                    return { ...item, product };
                }));
                setCartItems(itemsWithDetails);
            } catch (err) {
                setError(err.message || 'Failed to fetch cart items');
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, []);

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const orderAll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await Promise.all(cartItems.map(async (item) => {
                const orderData = {
                    product: item.productId,
                    user: user.id,
                    quantity: item.quantity,
                    paymentMethod: "cash",
                    totalAmount: item.product.price * item.quantity
                };
                await createOrder(orderData);
            }));
            
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Error creating orders:', error);
            setError(error.message || 'An error occurred while creating orders');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h1>
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <div className='flex flex-col gap-4'>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.productId} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                                <div>
                                    <p><strong>Product:</strong> {item.product.title}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Price:</strong> {item.product.price}€</p>
                                    <p><strong>Address:</strong> {item.address.street}, {item.address.city}, {item.address.country}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex space-x-4 justify-center">
                        <button onClick={clearCart} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">Clear Cart</button>
                        <button onClick={orderAll} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">Order All</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;