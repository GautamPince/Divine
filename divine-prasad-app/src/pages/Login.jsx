import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaOm } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) return;

        const result = await login(email, password);
        if (result.success) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo?.role === 'admin') {
                navigate('/admin');
            } else if (userInfo?.role === 'vendor') {
                navigate('/vendor');
            } else {
                navigate('/');
            }
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <FaOm className="auth-icon" />
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue your divine journey</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <Link to="/forgot-password" class="forgot-link">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="btn-primary auth-btn">Sign In</button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
