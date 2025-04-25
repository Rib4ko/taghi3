import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../api/user';
import { getUserOrders } from '../api/order';
import Loading from '../components/Loading';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = getUser();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const userOrders = await getUserOrders();
                setOrders(userOrders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) {
        return <div>You need to be logged in to view your order history.</div>;
    }

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen md:p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>
            {orders.length === 0 ? (
                <p className="text-center">You have no orders yet.</p>
            ) : (
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200 md:table-auto table-fixed">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6">Order ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6">Total Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6">Address</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.totalAmount}€</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{`${order.address.street}, ${order.address.city}, ${order.address.country}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/order/${order._id}`} className="text-blue-500 hover:text-blue-700">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;