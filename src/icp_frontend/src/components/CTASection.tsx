import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Ready to Experience the Future of DeFi?</h2>
        <p>
          Join thousands of users who are already benefiting from BQBTC's advanced 
          DeFi platform. Start your journey today with lightning-fast transactions 
          and enterprise-grade security.
        </p>
        <div className="cta-buttons-container">
          <Link to="/dashboard" className="cta-btn-primary">
            <span className="btn-icon">🚀</span>
            <span>Launch App Now</span>
          </Link>
          <a href="#features" className="cta-btn-secondary">
            <span className="btn-icon">🔍</span>
            <span>Explore Features</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
