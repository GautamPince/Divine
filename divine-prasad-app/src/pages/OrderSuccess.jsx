import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './Auth.css'; // Reuse auth styles for simplicity

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId } = location.state || {};

    return (
        <div className="auth-container" style={{ textAlign: 'center', padding: '50px 20px' }}>
            <FaCheckCircle size={80} color="green" style={{ marginBottom: '20px' }} />
            <h1>Order Placed Successfully!</h1>
            {orderId && <p>Your Order ID is: <strong>#{orderId}</strong></p>}
            <p>Thank you for shopping with Divine Prasad.</p>
            <div style={{ marginTop: '30px' }}>
                <Link to="/shop" className="btn-primary" style={{ marginRight: '10px' }}>Continue Shopping</Link>
                <Link to="/profile" className="btn-secondary">View Orders</Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
