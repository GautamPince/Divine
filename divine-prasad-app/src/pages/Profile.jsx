import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaSave, FaSignOutAlt } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // In a real app, this would call an API to update the user
        console.log('Saving user data:', formData);
        setIsEditing(false);
        // Update local user state if needed (mock update)
        // login({ ...user, ...formData }); 
        alert('Profile updated successfully!');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <FaUserCircle />
                </div>
                <h2>{user.name}</h2>
                <p className="profile-role">{user.role || 'Devotee'}</p>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <div className="section-header">
                        <h3>Personal Information</h3>
                        {!isEditing ? (
                            <button className="icon-btn edit-btn" onClick={() => setIsEditing(true)}>
                                <FaEdit /> Edit
                            </button>
                        ) : (
                            <button className="icon-btn save-btn" onClick={handleSave}>
                                <FaSave /> Save
                            </button>
                        )}
                    </div>

                    <div className="info-grid">
                        <div className="info-item">
                            <label>Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{formData.name}</p>
                            )}
                        </div>

                        <div className="info-item">
                            <label>Email</label>
                            <p>{formData.email}</p> {/* Email usually not editable directly */}
                        </div>

                        <div className="info-item">
                            <label>Phone</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Add phone number"
                                />
                            ) : (
                                <p>{formData.phone || 'Not provided'}</p>
                            )}
                        </div>

                        <div className="info-item full-width">
                            <label>Address</label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Add delivery address"
                                />
                            ) : (
                                <p>{formData.address || 'Not provided'}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="profile-actions">
                    <button className="btn-secondary logout-action-btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
