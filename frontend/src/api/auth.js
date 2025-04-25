import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const getToken = () => {
  return localStorage.getItem('token');
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllSellers = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/sellers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMe = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (email, password, username) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { email, password, username });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createSeller = async (email, password, username, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/create-seller`, { email, password, username }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};