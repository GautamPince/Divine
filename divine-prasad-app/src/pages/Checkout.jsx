import React, { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave, FaSpinner } from 'react-icons/fa';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const total = getCartTotal();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        pincode: '',
        phone: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please login to place an order');
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            let paymentDetails = {};

            // Process Mock Payment if Online
            if (paymentMethod === 'ONLINE') {
                const paymentRes = await axios.post('/api/payment/process', {
                    amount: total,
                    paymentMethod: 'Credit Card' // Mocking card
                }, config);

                if (paymentRes.data.success) {
                    paymentDetails = {
                        transactionId: paymentRes.data.transactionId,
                        status: 'paid'
                    };
                } else {
                    throw new Error('Payment failed');
                }
            }

            const orderItems = cartItems.map(item => ({
                id: item.id,
                qty: item.quantity,
                price: item.price
            }));

            const orderData = {
                orderItems,
                shippingAddress: formData,
                paymentMethod,
                totalPrice: total,
                ...paymentDetails
            };

            const { data } = await axios.post('/api/orders', orderData, config);

            clearCart();
            navigate('/order-success', { state: { orderId: data.id } });
        } catch (error) {
            console.error('Order error:', error);
            alert(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/shop');
        return null;
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="page-title">Secure Checkout</h1>

                <div className="checkout-layout">
                    <div className="checkout-form-section">
                        <h2>Shipping Details</h2>
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    required
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        required
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="payment-selection">
                                <h3>Payment Method</h3>
                                <div
                                    className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}
                                    onClick={() => handlePaymentChange('COD')}
                                >
                                    <FaMoneyBillWave className="payment-icon" />
                                    <div>
                                        <h4>Cash on Delivery</h4>
                                        <p>Pay when you receive your order</p>
                                    </div>
                                </div>
                                <div
                                    className={`payment-option ${paymentMethod === 'ONLINE' ? 'selected' : ''}`}
                                    onClick={() => handlePaymentChange('ONLINE')}
                                >
                                    <FaCreditCard className="payment-icon" />
                                    <div>
                                        <h4>Online Payment</h4>
                                        <p>Credit/Debit Card, UPI, NetBanking</p>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary place-order-btn" disabled={isProcessing}>
                                {isProcessing ? (
                                    <><FaSpinner className="spinner" /> Processing...</>
                                ) : (
                                    `Place Order ${paymentMethod === 'ONLINE' ? '(Pay Now)' : ''}`
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="order-summary-section">
                        <h2>Order Summary</h2>
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div className="summary-item" key={item.id}>
                                    <div className="summary-item-info">
                                        <span className="summary-item-name">{item.name}</span>
                                        <span className="summary-item-qty">x {item.quantity}</span>
                                    </div>
                                    <span className="summary-item-price">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-total">
                            <span>Total Amount</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="payment-info">
                            <p>Payment Method: <strong>{paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</strong></p>
                            <p className="secure-note">Payments are secure and encrypted.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
