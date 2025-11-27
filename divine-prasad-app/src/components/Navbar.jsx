import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Divine Prasad</span>
        </Link>

        <div className="navbar-desktop">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          {user && user.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
          {user && user.role === 'vendor' && <Link to="/vendor" className="nav-link">Vendor</Link>}

          <div className="nav-icons">
            <button onClick={toggleTheme} className="icon-btn theme-btn">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            <Link to="/cart" className="icon-btn cart-btn">
              <FaShoppingCart />
              {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            </Link>

            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="icon-btn"><FaUser /></Link>
              </div>
            ) : (
              <Link to="/login" className="btn-primary login-btn">Login</Link>
            )}
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            {user && user.role === 'admin' && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
            {user && user.role === 'vendor' && <Link to="/vendor" onClick={() => setIsMenuOpen(false)}>Vendor</Link>}
            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart ({getCartCount()})</Link>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
