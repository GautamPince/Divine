import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaStore, FaShoppingCart, FaUser, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import './MobileLayout.css';

import Navbar from '../components/Navbar';

const MobileLayout = () => {
    const { user } = useAuth();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <div className="mobile-layout">
            <Navbar />

            <main className="mobile-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MobileLayout;
