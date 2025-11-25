import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaStore, FaShoppingCart, FaUser, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './MobileLayout.css';

const MobileLayout = () => {
    const { user } = useAuth();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <div className="mobile-layout">
            <header className="mobile-app-bar">
                <span className="app-bar-title">Divine Prasad</span>
            </header>

            <main className="mobile-content">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <FaHome />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <FaStore />
                    <span>Shop</span>
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <div className="icon-wrapper">
                        <FaShoppingCart />
                        {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
                    </div>
                    <span>Cart</span>
                </NavLink>

                {user ? (
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <FaUser />
                        <span>Profile</span>
                    </NavLink>
                ) : (
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <FaSignInAlt />
                        <span>Login</span>
                    </NavLink>
                )}
            </nav>
        </div>
    );
};

export default MobileLayout;
