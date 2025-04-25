import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../api/order';
import Loading from '../components/Loading';
import { Navigate } from 'react-router-dom';
import { getUser } from '../api/user';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = getUser();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrderById(id);
                setOrder(data);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching the order');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
    }

    if (!order) {
        return <div className="container mx-auto p-4">Order not found</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Order Details</h1>
                <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                    <p className="mb-2"><strong className="text-gray-700">Order ID:</strong> {order._id}</p>
                    <p className="mb-2"><strong className="text-gray-700">Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                    <p className="mb-2"><strong className="text-gray-700">Total Amount:</strong> {order.totalAmount}€</p>
                    <p className="mb-2"><strong className="text-gray-700">Status:</strong> {order.status}</p>
                    <div className="mb-2">
                        <strong className="text-gray-700">Address:</strong>
                        <p>{order.address.street}, {order.address.city}, {order.address.country}</p>
                    </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Products</h2>
                <ul className="space-y-2">
                    <li className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 bg-gray-200 p-2 md:p-4 rounded-lg">
                        <strong className="text-gray-700">Name</strong>
                        <strong className="text-gray-700">Quantity</strong>
                        <strong className="text-gray-700">Price</strong>
                    </li>
                    {order.products && order.products.map(product => (
                        <li key={product._id} className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 p-2 md:p-4 border rounded-lg bg-gray-50">
                            <p className="text-gray-600">{product.title}</p>
                            <p className="text-gray-600">{product.quantity}</p>
                            <p className="text-gray-600">{product.price}€</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderDetails;