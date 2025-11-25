import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { FaStar, FaShoppingCart, FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            window.scrollTo(0, 0);
        } else {
            navigate('/shop');
        }
    }, [id, navigate]);

    if (!product) return null;

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="product-details-page">
            <div className="container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>

                <div className="product-main">
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.image} alt={product.name} />
                            <span className="product-tag-large">{product.tag}</span>
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="product-header-info">
                            <h1 className="product-title">{product.name}</h1>
                            <p className="product-temple">{product.temple}</p>
                            <div className="product-rating">
                                <FaStar /> {product.rating} <span>(120 reviews)</span>
                            </div>
                        </div>

                        <div className="product-price-section">
                            <span className="current-price">₹{product.price}</span>
                            <span className="original-price">₹{product.price + 100}</span>
                            <span className="discount">Save ₹100</span>
                        </div>

                        <p className="product-description">{product.description}</p>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button className="btn-primary add-to-cart-large" onClick={() => {
                                addToCart(product, quantity);
                                alert('Added to cart!');
                            }}>
                                <FaShoppingCart /> Add to Cart
                            </button>
                            <button className="share-btn">
                                <FaShareAlt />
                            </button>
                        </div>

                        <div className="product-features">
                            <div className="feature-item">
                                <h4>Authentic</h4>
                                <p>Sourced directly from temple</p>
                            </div>
                            <div className="feature-item">
                                <h4>Fresh</h4>
                                <p>Prepared daily with devotion</p>
                            </div>
                            <div className="feature-item">
                                <h4>Secure</h4>
                                <p>Hygienic packaging & delivery</p>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h2>Related Offerings</h2>
                        <div className="related-grid">
                            {relatedProducts.map(item => (
                                <div className="prasad-card" key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
                                    <div className="card-image-container">
                                        <img src={item.image} alt={item.name} className="card-image" />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">{item.name}</h3>
                                        <p className="card-temple">{item.temple}</p>
                                        <div className="card-footer">
                                            <span className="card-price">₹{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
