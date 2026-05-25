import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('jwtToken');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await authService.login(username, password);
      const userData = {
        username: response.username || 'admin',
        role: response.role || 'ADMIN',
      };
      
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return response;
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : err?.message || 'Login failed';
      setError(errorMsg);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
