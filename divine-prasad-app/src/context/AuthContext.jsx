import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    // Ideally fetch profile here. For now, rely on stored user info or just token validity.
                    // const res = await axios.get('/api/auth/profile', config);
                    // setUser(res.data);

                    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
                    if (storedUser) {
                        console.log('Restoring user from storage:', storedUser);
                        setUser(storedUser);
                    }
                } catch (error) {
                    console.error('Token check failed:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login for:', email);
            const { data } = await axios.post('/api/auth/login', { email, password });
            console.log('Login success, data:', data);
            setUser(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const signup = async (name, email, password) => {
        try {
            console.log('Attempting signup for:', email);
            const { data } = await axios.post('/api/auth/signup', { name, email, password });
            console.log('Signup success, data:', data);
            setUser(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            console.error('Signup error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed'
            };
        }
    };

    const logout = () => {
        console.log('Logging out');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
