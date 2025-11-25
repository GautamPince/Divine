import React from 'react';
import { FaRupeeSign, FaBox, FaStar, FaClipboardCheck } from 'react-icons/fa';
import '../admin/AdminDashboard.css'; // Reusing Admin styles

const VendorDashboard = () => {
    const stats = [
        { title: 'Total Sales', value: '₹45,000', icon: <FaRupeeSign />, color: '#10b981' },
        { title: 'Active Products', value: '12', icon: <FaBox />, color: '#3b82f6' },
        { title: 'Pending Orders', value: '5', icon: <FaClipboardCheck />, color: '#f59e0b' },
        { title: 'Store Rating', value: '4.8', icon: <FaStar />, color: '#8b5cf6' },
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
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ORD-001</td>
                                <td>Tirupati Laddu</td>
                                <td>2</td>
                                <td><span className="status-badge success">Shipped</span></td>
                            </tr>
                            <tr>
                                <td>#ORD-004</td>
                                <td>Kashi Prasad</td>
                                <td>1</td>
                                <td><span className="status-badge warning">Processing</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
