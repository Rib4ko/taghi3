import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMyProducts = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/seller/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProduct = async (title, description, price, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/seller/products`, { title, description, price }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (id, title, description, price, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/seller/products/${id}`, { title, description, price }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/seller/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};