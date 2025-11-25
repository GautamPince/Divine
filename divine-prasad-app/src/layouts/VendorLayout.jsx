import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaChartLine, FaBox, FaClipboardList, FaStore, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../layouts/AdminLayout.css'; // Reusing Admin styles for consistency

const VendorLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user && user.role !== 'vendor') {
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
                    <h2>Vendor Portal</h2>
                </div>
                <nav className="admin-nav">
                    <NavLink to="/vendor" end className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaChartLine /> Dashboard
                    </NavLink>
                    <NavLink to="/vendor/products" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaBox /> My Products
                    </NavLink>
                    <NavLink to="/vendor/orders" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaClipboardList /> Orders
                    </NavLink>
                    <NavLink to="/vendor/profile" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                        <FaStore /> Store Profile
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
                    <h3>Vendor Dashboard</h3>
                    <div className="admin-user-info">
                        <span>Temple Vendor</span>
                    </div>
                </header>
                <div className="admin-page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default VendorLayout;
