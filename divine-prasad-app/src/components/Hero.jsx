import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="hero" id="home">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h1 className="hero-title">Blessings Delivered Home</h1>
                <p className="hero-subtitle">Experience the divine connection with authentic Prasad from India's holiest temples, delivered to your doorstep.</p>
                <div className="hero-buttons">
                    <button onClick={() => navigate('/shop')} className="btn-primary hero-btn">Order Now</button>
                    <button onClick={() => navigate('/temples')} className="btn-secondary hero-btn">Explore Temples</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
