import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { FaFilter, FaSearch, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(2000);
    const [showFilters, setShowFilters] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.temple.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesPrice = product.price <= priceRange;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [searchTerm, selectedCategory, priceRange, products]);

    return (
        <div className="shop-page">
            <div className="shop-header">
                <h1>Divine Offerings</h1>
                <p>Order sacred prasad from India's most holy temples</p>
            </div>

            <div className="shop-container">
                {/* Mobile Filter Toggle */}
                <button className="mobile-filter-btn" onClick={() => setShowFilters(!showFilters)}>
                    <FaFilter /> Filters
                </button>

                {/* Sidebar Filters */}
                <aside className={`shop-sidebar ${showFilters ? 'show' : ''}`}>
                    <div className="sidebar-section">
                        <h3>Search</h3>
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search prasad or temple..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h3>Categories</h3>
                        <div className="category-list">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h3>Max Price: ₹{priceRange}</h3>
                        <input
                            type="range"
                            min="100"
                            max="2000"
                            step="50"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="price-range"
                        />
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="shop-grid">
                    {loading ? (
                        <div className="loading-spinner">Loading sacred offerings...</div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div className="product-card" key={product.id} onClick={() => window.location.href = `/product/${product.id}`}>
                                <div className="product-image-wrapper">
                                    <img src={product.image} alt={product.name} loading="lazy" />
                                    <span className="product-tag">{product.tag}</span>
                                </div>
                                <div className="product-details">
                                    <div className="product-header">
                                        <h3>{product.name}</h3>
                                        <div className="rating">
                                            <FaStar /> {product.rating}
                                        </div>
                                    </div>
                                    <p className="temple-name">{product.temple}</p>
                                    <p className="product-desc">{product.description}</p>
                                    <div className="product-footer">
                                        <span className="price">₹{product.price}</span>
                                        <button className="btn-primary add-btn" onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                            alert('Added to cart!');
                                        }}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <h3>No sacred offerings found</h3>
                            <p>Try adjusting your filters</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
