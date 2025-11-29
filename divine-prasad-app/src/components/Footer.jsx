import { Link } from 'react-router-dom';
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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/temples">Temples</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
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
                <p> <span className="heart">&copy;</span> 2024 Divine Prasad. All rights reserved.&nbsp;|&nbsp;Made with &nbsp; <span className="heart">&#9829;</span>&nbsp; By Prince Kumar Gautam</p>
            </div>
        </footer>
    );
};

export default Footer;
