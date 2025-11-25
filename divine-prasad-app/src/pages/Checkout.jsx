import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please login to place an order');
            navigate('/login');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const orderItems = cartItems.map(item => ({
                id: item.id,
                qty: item.quantity,
                price: item.price
            }));

            const orderData = {
                orderItems,
                shippingAddress: formData,
                paymentMethod: 'COD',
                totalPrice: total
            };

            const { data } = await axios.post('/api/orders', orderData, config);

            alert('Order placed successfully! May the divine blessings be with you.');
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Order error:', error);
            alert(error.response?.data?.message || 'Failed to place order');
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

                            <button type="submit" className="btn-primary place-order-btn">
                                Place Order (Pay on Delivery)
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
                            <p>Payment Method: <strong>Cash on Delivery</strong></p>
                            <p className="secure-note">Payments are secure and encrypted.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
