import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-container">

                <h2 className="about-title">About Us</h2>

                <div className="about-wrapper">

                    <div className="about-img-wrapper">
                        <img
                            src="/assets/Admin.jpg"
                            alt="About Divine Prasad"
                        />
                    </div>

                    <div className="about-content">
                        <h3 className="about-heading">Our Story</h3>

                        <p className="about-text">
                            Welcome to <span className="about-highlight">Divine Prasad</span>,
                            where spirituality meets convenience. We deliver sacred prasad
                            from holy temples directly to your home.
                        </p>

                        <p className="about-text">
                            Every offering is prepared with purity, devotion, and care.
                            Our mission is to help devotees stay connected to their
                            traditions and spiritual roots.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;
