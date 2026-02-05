import React from 'react';
import '../styles/Footer.css';
import logo from '../assets/logo.jpg'; // adjust if your logo is elsewhere

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <img src={logo} alt="DonateNow Logo" className="footer-logo" />
          <h2 className="footer-site-name">DonateNow</h2>
        </div>

        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/donate">Donate</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-socials">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DonateNow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
