import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DesktopLayout = () => {
    return (
        <div className="desktop-layout">
            <Navbar />
            <main className="desktop-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DesktopLayout;
