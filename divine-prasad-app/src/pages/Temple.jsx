import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Temple.css';

const Temple = () => {
    return (
        <div className="temple-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="temple-content"
            >
                <h1 className="temple-title">Comming Soon</h1>

                <p className="temple-text">
                    We are currently working on bringing you a divine collection of temples to explore.
                    Stay tuned for an immersive spiritual journey.
                </p>

                <Link to="/" className="btn-primary temple-btn">
                    Return Home
                </Link>
            </motion.div>
        </div>
    );
};

export default Temple;
