import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { products } from '../../data/products';
import './AdminProductForm.css';

const AdminProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const isEditMode = !!id;

    const basePath = location.pathname.includes('/vendor') ? '/vendor' : '/admin';

    const [formData, setFormData] = useState({
        name: '',
        temple: '',
        category: 'Sweets',
        price: '',
        description: '',
        image: '',
        tag: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                setFormData(product);
            }
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            if (isEditMode) {
                await axios.put(`/api/products/${id}`, formData, config);
                alert('Product updated successfully!');
            } else {
                await axios.post('/api/products', formData, config);
                alert('Product added successfully!');
            }
            navigate(`${basePath}/products`);
        } catch (error) {
            console.error('Error saving product:', error);
            alert(error.response?.data?.message || 'Failed to save product');
        }
    };

    return (
        <div className="admin-form-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate(`${basePath}/products`)}>
                    <FaArrowLeft /> Back to Products
                </button>
                <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Temple Name</label>
                            <input
                                type="text"
                                name="temple"
                                value={formData.temple}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Sweets">Sweets</option>
                                <option value="Dry Fruits">Dry Fruits</option>
                                <option value="Savory">Savory</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="/assets/..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Tag (Optional)</label>
                            <input
                                type="text"
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                placeholder="e.g. Best Seller"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={() => navigate(`${basePath}/products`)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            <FaSave /> {isEditMode ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;
