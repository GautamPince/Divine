import React from 'react';
import { products } from '../data/products';
import './FeaturedPrasad.css';

const FeaturedPrasad = () => {
    // Display only the first 4 products as featured
    const featuredItems = products.slice(0, 4);

    return (
        <section className="featured-section" id="shop">
            <div className="container">
                <h2 className="section-title">Sacred Offerings</h2>
                <div className="prasad-grid">
                    {featuredItems.map((item) => (
                        <div className="prasad-card" key={item.id} onClick={() => window.location.href = `/product/${item.id}`}>
                            <div className="card-image-container">
                                <img src={item.image} alt={item.name} className="card-image" />
                                <span className="card-tag">{item.tag}</span>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.name}</h3>
                                <p className="card-temple">{item.temple}</p>
                                <div className="card-footer">
                                    <span className="card-price">₹{item.price}</span>
                                    <button className="btn-primary card-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        // Add to cart logic here
                                    }}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPrasad;
