import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();
    const total = getCartTotal();

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <FaShoppingBag className="empty-cart-icon" />
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any sacred offerings yet.</p>
                <button className="btn-primary" onClick={() => navigate('/shop')}>
                    Browse Offerings
                </button>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="page-title">Your Sacred Cart</h1>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>

                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-temple">{item.temple}</p>
                                    <p className="item-price">₹{item.price}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                        <button className="btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
                            Proceed to Checkout
                        </button>
                        <button className="continue-shopping-btn" onClick={() => navigate('/shop')}>
                            <FaArrowLeft /> Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
