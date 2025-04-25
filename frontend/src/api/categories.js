import { getUser } from './user';

export const createOrder = async (orderData) => {
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return await response.json();
};

export const getAllOrders = async () => {
    const response = await fetch('/api/orders');
    if (!response.ok) {
        throw new Error('Failed to get orders');
    }
    return await response.json();
};

export const getOrderById = async (id) => {
    const response = await fetch(`/api/orders/${id}`);
    if (!response.ok) {
        throw new Error('Failed to get order');
    }
    return await response.json();
};

export const updateOrder = async (id, data) => {
    const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update order');
    }
    return await response.json();
};

export const getUserOrders = async () => {
    const response = await fetch('/api/orders');
    if (!response.ok) {
        throw new Error('Failed to get user orders');
    }
    const data = await response.json();
    const user = getUser();
    return data.filter(order => order.user === user.id);
};

export const getAllCategories = async () => {
    const response = await fetch('/api/categories');
    if (!response.ok) {
        throw new Error('Failed to get categories');
    }
    return await response.json();
};