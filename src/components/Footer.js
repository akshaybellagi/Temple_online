import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>A spiritual organization dedicated to serving devotees and preserving traditions.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/booking">Booking</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +91 XXXXXXXXXX</p>
            <p>Address: Your Location</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Spiritual Matha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
