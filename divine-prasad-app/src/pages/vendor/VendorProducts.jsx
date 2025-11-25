import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import '../admin/AdminProducts.css'; // Reuse admin styles

const VendorProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                // In a real app, we would filter by vendor ID here or let the API do it
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-products-page">
            <div className="page-header">
                <h2>My Products</h2>
                <Link to="/vendor/products/new" className="btn-primary add-product-btn">
                    <FaPlus /> Add New Product
                </Link>
            </div>

            <div className="table-actions">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search my products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt={product.name} className="product-thumbnail" />
                                </td>
                                <td className="product-name-cell">
                                    <span className="name">{product.name}</span>
                                    <span className="temple">{product.temple}</span>
                                </td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="icon-btn edit-btn" title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button className="icon-btn delete-btn" title="Delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VendorProducts;
