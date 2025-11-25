import React from 'react';
import { FaShoppingCart, FaUsers, FaRupeeSign, FaBoxOpen } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const stats = [
        { title: 'Total Orders', value: '1,234', icon: <FaShoppingCart />, color: '#3b82f6' },
        { title: 'Total Revenue', value: '₹5.4L', icon: <FaRupeeSign />, color: '#10b981' },
        { title: 'Active Users', value: '892', icon: <FaUsers />, color: '#8b5cf6' },
        { title: 'Products', value: '45', icon: <FaBoxOpen />, color: '#f59e0b' },
    ];

    return (
        <div className="admin-dashboard">
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-sections">
                <div className="recent-orders">
                    <h3>Recent Orders</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ORD-001</td>
                                <td>Rahul Kumar</td>
                                <td>₹500</td>
                                <td><span className="status-badge success">Delivered</span></td>
                            </tr>
                            <tr>
                                <td>#ORD-002</td>
                                <td>Priya Singh</td>
                                <td>₹1,200</td>
                                <td><span className="status-badge warning">Pending</span></td>
                            </tr>
                            <tr>
                                <td>#ORD-003</td>
                                <td>Amit Shah</td>
                                <td>₹750</td>
                                <td><span className="status-badge info">Shipped</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
