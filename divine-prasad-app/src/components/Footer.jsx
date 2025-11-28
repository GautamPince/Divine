import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaOm } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <div className="footer-logo">
                        <FaOm className="footer-icon" />
                        <span>Divine Prasad</span>
                    </div>
                    <p className="footer-desc">Connecting devotees with the divine through authentic temple offerings.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#temples">Temples</a></li>
                        <li><a href="#shop">Shop</a></li>
                        <li><a href="#about">About Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@divineprasad.com</p>
                    <p>Phone: +91 98765 43210</p>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p> <span className="heart">&copy;</span> 2024 Divine Prasad. All rights reserved.</p>
                <p>Made with &nbsp; <span className="heart">&#9829;</span>&nbsp; by Prince Kumar Gautam</p>
            </div>
        </footer>
    );
};

export default Footer;
