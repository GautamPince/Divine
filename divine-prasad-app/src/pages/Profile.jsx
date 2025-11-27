import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaShoppingBag, FaSignOutAlt, FaBoxOpen, FaClock, FaCheckCircle } from 'react-icons/fa';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all'); // all, pending, delivered

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axios.get('/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return order.status === 'pending' || order.status === 'processing';
        if (activeTab === 'delivered') return order.status === 'delivered';
        return true;
    });

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'status-success';
            case 'pending': return 'status-warning';
            case 'processing': return 'status-info';
            case 'cancelled': return 'status-danger';
            default: return 'status-default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <FaCheckCircle />;
            case 'pending': return <FaClock />;
            default: return <FaBoxOpen />;
        }
    };

    if (!user) return <div className="profile-page container">Please log in to view profile.</div>;

    return (
        <div className="profile-page container">
            <motion.div
                className="profile-layout"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Left Column: User Profile */}
                <div className="profile-sidebar">
                    <div className="profile-card glass user-card">
                        <div className="profile-avatar">
                            <FaUser />
                        </div>
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-email"><FaEnvelope /> {user.email}</p>
                        <div className="profile-role-badge">{user.role}</div>

                        <button onClick={logout} className="logout-btn">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

                {/* Right Column: Order History */}
                <div className="profile-main">
                    <div className="orders-section glass">
                        <div className="section-header">
                            <h2><FaShoppingBag /> My Orders</h2>
                            <div className="tabs">
                                <button
                                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('pending')}
                                >
                                    Pending
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('delivered')}
                                >
                                    Delivered
                                </button>
                            </div>
                        </div>

                        <div className="orders-list">
                            {loading ? (
                                <div className="loading-state">Loading orders...</div>
                            ) : filteredOrders.length === 0 ? (
                                <div className="empty-state">
                                    <FaBoxOpen size={40} />
                                    <p>No orders found in this category.</p>
                                </div>
                            ) : (
                                filteredOrders.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        className="order-card"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="order-header">
                                            <div className="order-id-date">
                                                <span className="order-id">#{order.id}</span>
                                                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className={`order-status-badge ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)} {order.status}
                                            </div>
                                        </div>

                                        <div className="order-items-preview">
                                            {order.Products.map(product => (
                                                <div key={product.id} className="order-item-row">
                                                    <span className="item-name">{product.name}</span>
                                                    <span className="item-qty">x{product.OrderItem.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="order-footer">
                                            <span className="total-label">Total Amount:</span>
                                            <span className="total-amount">₹{order.totalAmount}</span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
