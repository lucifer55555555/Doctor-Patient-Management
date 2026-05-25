import apiClient from './apiClient';

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('jwtToken');
};

export const getToken = () => {
  return localStorage.getItem('jwtToken');
};
