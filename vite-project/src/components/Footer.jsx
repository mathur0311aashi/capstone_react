import React from 'react';
import '../index.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <h3>Travel Planner</h3>
                    <p>Plan your trips smartly with budget-friendly options and smart recommendations.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/planner">Planner</a></li>
                        <li><a href="/recommendations">Recommendations</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@travelplanner.com</p>
                    <p>Phone: +91 9876543210</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Travel Planner | All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer