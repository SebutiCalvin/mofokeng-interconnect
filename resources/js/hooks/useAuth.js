import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            api.get('/user')
                .then((response) => {
                    setUser(response.data);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    localStorage.removeItem('auth_token');
                    setIsAuthenticated(false);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            const { user, token } = response.data;
            localStorage.setItem('auth_token', token);
            setUser(user);
            setIsAuthenticated(true);
            return { success: true, user };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed' 
            };
        }
    }, []);

    const register = useCallback(async (userData) => {
        try {
            const response = await api.post('/register', userData);
            const { user, token } = response.data;
            localStorage.setItem('auth_token', token);
            setUser(user);
            setIsAuthenticated(true);
            return { success: true, user };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || 'Registration failed',
                errors: error.response?.data?.errors || {}
            };
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post('/logout');
        } catch (error) {}
        localStorage.removeItem('auth_token');
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    return {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
    };
};
