import React from 'react';
import { FaOm, FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log('Navbar render, user:', user);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <FaOm className="logo-icon" />
          <span className="logo-text">Divine Prasad</span>
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/shop">Shop</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>

        <div className="nav-actions">
          <button className="icon-btn search-btn" aria-label="Search">
            <FaSearch />
          </button>

          <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="icon-btn" title="Profile">
                <FaUserCircle />
              </Link>
              <button onClick={logout} className="btn-secondary logout-btn">Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-primary login-btn">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
