import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setFeaturedProducts(data.slice(0, 4)); // Get first 4 products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Experience the Divine <br /> <span className="highlight">Prasad from Home</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Authentic temple offerings delivered to your doorstep with purity and devotion.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to="/shop" className="btn-primary hero-btn">
                            Shop Now <FaArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section container">
                <div className="feature-card">
                    <img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" alt="Fresh" />
                    <h3>100% Fresh</h3>
                    <p>Prepared daily with pure ingredients.</p>
                </div>
                <div className="feature-card">
                    <img src="https://cdn-icons-png.flaticon.com/512/709/709790.png" alt="Delivery" />
                    <h3>Fast Delivery</h3>
                    <p>Reach you within 24-48 hours.</p>
                </div>
                <div className="feature-card">
                    <img src="https://cdn-icons-png.flaticon.com/512/1041/1041888.png" alt="Secure" />
                    <h3>Secure Packaging</h3>
                    <p>Hygienic and tamper-proof packing.</p>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-products container">
                <div className="section-header">
                    <h2>Featured Offerings</h2>
                    <Link to="/shop" className="view-all-link">View All</Link>
                </div>

                <div className="products-grid">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="product-card glass"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} />
                                <div className="card-overlay">
                                    <Link to={`/product/${product.id}`} className="btn-secondary">View Details</Link>
                                </div>
                            </div>
                            <div className="product-info">
                                <span className="temple-tag">{product.temple}</span>
                                <h3>{product.name}</h3>
                                <div className="price-row">
                                    <span className="price">₹{product.price}</span>
                                    <div className="rating"><FaStar /> 4.8</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
