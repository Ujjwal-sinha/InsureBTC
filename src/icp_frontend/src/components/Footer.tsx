import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="InsureBTC" className="footer-logo-image" />
              <span className="logo-badge">PROTOCOL</span>
            </div>
            <p className="footer-description">
              Building the future of decentralized finance on the Internet Computer. 
              Secure, scalable, and user-friendly DeFi solutions for the next generation.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="Discord">
                <span className="social-icon">💬</span>
              </a>
              <a href="#" className="social-link" aria-label="Telegram">
                <span className="social-icon">📱</span>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <span className="social-icon">💻</span>
              </a>
            </div>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-links-section">
              <h4 className="footer-links-title">Platform</h4>
              <div className="footer-links-list">
                <a href="#features" className="footer-link">Features</a>
                <a href="#icp-benefits" className="footer-link">ICP Benefits</a>
                <a href="#technology" className="footer-link">Technology</a>
                <a href="#about" className="footer-link">About</a>
                <a href="#stats" className="footer-link">Statistics</a>
              </div>
            </div>
            
            <div className="footer-links-section">
              <h4 className="footer-links-title">Products</h4>
              <div className="footer-links-list">
                <Link to="/dashboard" className="footer-link">Token Management</Link>
                <Link to="/governance" className="footer-link">Governance</Link>
                <Link to="/cover" className="footer-link">Insurance Cover</Link>
                <Link to="/pool" className="footer-link">Liquidity Pools</Link>
              </div>
            </div>
            
            <div className="footer-links-section">
              <h4 className="footer-links-title">Resources</h4>
              <div className="footer-links-list">
                <a href="#" className="footer-link">Documentation</a>
                <a href="#" className="footer-link">API Reference</a>
                <a href="#" className="footer-link">Developer Guide</a>
                <a href="#" className="footer-link">Security</a>
              </div>
            </div>
            
            <div className="footer-links-section">
              <h4 className="footer-links-title">Support</h4>
              <div className="footer-links-list">
                <a href="#" className="footer-link">Help Center</a>
                <a href="#" className="footer-link">Contact Us</a>
                <a href="#" className="footer-link">Bug Report</a>
                <a href="#" className="footer-link">Status</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 InsureBTC Protocol. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#" className="legal-link">Privacy Policy</a>
              <a href="#" className="legal-link">Terms of Service</a>
              <a href="#" className="legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Background Elements */}
      <div className="footer-bg-elements">
        <div className="footer-bg-element"></div>
        <div className="footer-bg-element"></div>
        <div className="footer-bg-element"></div>
      </div>
    </footer>
  );
};

export default Footer;
