import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrder } from '../api/order';
import Loading from '../components/Loading';

const SellerOrders = () => {
    const [orders, setOrders] = useState([]); // State to store the orders
    const [loading, setLoading] = useState(false); // State to track loading status
    const [error, setError] = useState(null); // State to track any errors

    useEffect(() => {
        // Fetch orders when the component mounts
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await getAllOrders();
                setOrders(data); // Update the orders state with fetched data
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        // Update the status of an order
        try {
            await updateOrder(orderId, { status: newStatus }); // Update the order status via API
            setOrders(orders.map((order) => order._id === orderId ? { ...order, status: newStatus } : order));
        } catch (error) {
            console.error('Error updating order status:', error);
            setError(error.message || 'An error occurred while updating order status');
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen py-6 sm:py-12">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Manage Seller Orders</h1>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-gray-300 rounded-lg table-auto">
                        <thead className="bg-gray-200">
                            <tr className="text-gray-700 text-sm sm:text-base">
                                <th className="py-3 px-4 text-left">Order ID</th>
                                <th className="py-3 px-4 text-left">User</th>
                                <th className="py-3 px-4 text-left">Product</th>
                                <th className="py-3 px-4 text-left">Quantity</th>
                                <th className="py-3 px-4 text-left">Total Amount</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-100">
                                    <td className="border-t border-gray-300 py-2 px-4 text-gray-600 text-sm sm:text-base">{order._id}</td>
                                    <td className="border-t border-gray-300 py-2 px-4 text-gray-600 text-sm sm:text-base">{order.user}</td>
                                    <td className="border-t border-gray-300 py-2 px-4 text-gray-600 text-sm sm:text-base">{order.product}</td>
                                    <td className="border-t border-gray-300 py-2 px-4 text-gray-600 text-sm sm:text-base">{order.quantity}</td>
                                    <td className="border-t border-gray-300 py-2 px-4 text-gray-600 text-sm sm:text-base">${order.totalAmount}</td>
                                    <td className="border-t border-gray-300 py-2 px-4 text-gray-600 text-sm sm:text-base">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                            order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                            order.status === 'shipped' ? 'bg-blue-200 text-blue-800' :
                                            order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                                            'bg-red-200 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>                                
                                    <td className="border-t border-gray-300 py-2 px-4 text-gray-600 text-sm sm:text-base">
                                        <div className="flex items-center justify-center">
                                            <select
                                                className="border rounded-md p-2"
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="canceled">Canceled</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerOrders;
