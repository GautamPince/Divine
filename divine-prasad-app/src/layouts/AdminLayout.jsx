import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingBag, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
        } else if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Divine Admin</h2>
                </div>
                <nav className="admin-nav">
                    <NavLink to="/admin" end className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaTachometerAlt /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaBox /> Products
                    </NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaShoppingBag /> Orders
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaUsers /> Users
                    </NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaCog /> Settings
                    </NavLink>
                </nav>
                <div className="admin-footer">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>
            <main className="admin-content">
                <header className="admin-header">
                    <h3>Dashboard Overview</h3>
                    <div className="admin-user-info">
                        <span>Admin User</span>
                    </div>
                </header>
                <div className="admin-page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
