import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Ready to Start Your DeFi Journey?</h2>
        <p>
          Join thousands of users who are already earning, governing, and building the future of finance on the Internet Computer.
        </p>
        <div className="cta-buttons">
          <Link to="/dashboard" className="btn-primary">
            <span>🚀 Launch App</span>
            <div className="btn-glow"></div>
          </Link>
          <a href="#features" className="btn-secondary">
            <span>🔍 Learn More</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
