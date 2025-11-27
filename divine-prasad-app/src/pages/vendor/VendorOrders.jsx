import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { FaSearch } from 'react-icons/fa';
import '../admin/AdminOrders.css'; // Reuse admin styles

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get('/api/orders/vendor', config);
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching vendor orders:', error);
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id.toString().includes(searchTerm) ||
        order.User.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-orders-page">
            <div className="page-header">
                <h2>My Orders</h2>
            </div>

            <div className="table-actions">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by Order ID or User..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>My Products</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6">Loading...</td></tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr><td colSpan="6">No orders found.</td></tr>
                        ) : (
                            filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{order.User?.name || 'Unknown'}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>₹{order.totalAmount}</td>
                                    <td>
                                        {order.Products.map(p => (
                                            <div key={p.id}>
                                                {p.name} (x{p.OrderItem.quantity})
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VendorOrders;
