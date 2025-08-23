
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import HeroStats from '../components/HeroStats';
import CTASection from '../components/CTASection';

const LandingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup - minimal and professional
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);

    // Create minimal floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 400;
      posArray[i + 1] = (Math.random() - 0.5) * 400;
      posArray[i + 2] = (Math.random() - 0.5) * 400;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create minimal geometric accent
    const torusGeometry = new THREE.TorusGeometry(30, 2, 8, 50);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.z = -100;
    scene.add(torus);

    camera.position.z = 100;

    // Subtle animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Very subtle particle movement
      particlesMesh.rotation.y += 0.0002;
      
      // Slow torus rotation
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Minimal Three.js Canvas Background */}
      <canvas ref={canvasRef} className="three-canvas" />
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">BQBTC</span>
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#icp-benefits">ICP Benefits</a></li>
            <li><a href="#technology">Technology</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#stats">Stats</a></li>
          </ul>
          <Link to="/dashboard" className="dashboard-btn">
            <span className="btn-icon">⚡</span>
            <span>Launch App</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">🌐</span>
              <span>Powered by Internet Computer</span>
            </div>
            <h1>
              <span className="gradient-text">Next-Generation</span>
              <br />
              <span className="gradient-text">DeFi Protocol</span>
            </h1>
            <p className="hero-description">
              Experience the future of decentralized finance with BQBTC - the most advanced 
              DeFi platform built on the Internet Computer. Lightning-fast transactions, 
              enterprise security, and true decentralization.
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <span className="feature-icon">⚡</span>
                <span>1.1s Finality</span>
              </div>
              <div className="hero-feature">
                <span className="feature-icon">🔒</span>
                <span>99.9% Uptime</span>
              </div>
              <div className="hero-feature">
                <span className="feature-icon">🌐</span>
                <span>500+ Nodes</span>
              </div>
            </div>
            <div className="cta-buttons">
              <Link to="/dashboard" className="btn-primary">
                <span className="btn-icon">🚀</span>
                <span>Get Started Free</span>
                <div className="btn-glow"></div>
              </Link>
              <a href="#icp-benefits" className="btn-secondary">
                <span className="btn-icon">🔍</span>
                <span>Learn More</span>
              </a>
            </div>
          </div>
          
          {/* Hero Stats */}
          <div className="hero-stats-container">
            <HeroStats />
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-card" style={{ animationDelay: '0s' }}>
            <div className="card-icon">🪙</div>
            <div className="card-text">Token Management</div>
          </div>
          <div className="floating-card" style={{ animationDelay: '1s' }}>
            <div className="card-icon">🏛️</div>
            <div className="card-text">Governance</div>
          </div>
          <div className="floating-card" style={{ animationDelay: '2s' }}>
            <div className="card-icon">🛡️</div>
            <div className="card-text">Insurance</div>
          </div>
          <div className="floating-card" style={{ animationDelay: '3s' }}>
            <div className="card-icon">💧</div>
            <div className="card-text">Liquidity</div>
          </div>
        </div>
      </section>

      {/* ICP Benefits Section */}
      <section className="icp-benefits" id="icp-benefits">
        <div className="icp-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">⚡</span>
              <span>Why Internet Computer?</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">Revolutionary Technology</span>
            </h2>
            <p className="section-subtitle">
              Discover how ICP revolutionizes DeFi with unmatched performance, security, and decentralization
            </p>
          </div>
          
          <div className="icp-grid">
            <div className="icp-card">
              <div className="icp-icon">⚡</div>
              <h3>Web Speed Performance</h3>
              <p>
                Sub-second finality with unlimited scalability. Process thousands of transactions 
                per second with instant confirmation, just like traditional web applications.
              </p>
              <div className="icp-metric">
                <span className="metric-value">1.1s</span>
                <span className="metric-label">Finality</span>
              </div>
            </div>
            
            <div className="icp-card">
              <div className="icp-icon">🔒</div>
              <h3>Enterprise Security</h3>
              <p>
                Advanced cryptography and consensus mechanisms ensure your assets are protected 
                with military-grade security. No private keys to manage or lose.
              </p>
              <div className="icp-metric">
                <span className="metric-value">99.9%</span>
                <span className="metric-label">Uptime</span>
              </div>
            </div>
            
            <div className="icp-card">
              <div className="icp-icon">🌐</div>
              <h3>True Decentralization</h3>
              <p>
                No single point of failure. Distributed across hundreds of independent data centers 
                worldwide, ensuring censorship resistance and global accessibility.
              </p>
              <div className="icp-metric">
                <span className="metric-value">500+</span>
                <span className="metric-label">Nodes</span>
              </div>
            </div>
            
            <div className="icp-card">
              <div className="icp-icon">💡</div>
              <h3>Smart Contract Innovation</h3>
              <p>
                Canister smart contracts with automatic scaling, persistent memory, 
                and seamless integration with traditional web technologies.
              </p>
              <div className="icp-metric">
                <span className="metric-value">∞</span>
                <span className="metric-label">Scalability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">🛠️</span>
              <span>DeFi Features</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">Complete DeFi Suite</span>
            </h2>
            <p className="section-subtitle">
              Everything you need for modern decentralized finance in one platform
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🪙</div>
              <h3>Token Management</h3>
              <p>
                Mint, burn, and transfer BQBTC tokens with ease. Full control over your digital assets 
                with enterprise-grade security on the Internet Computer.
              </p>
              <div className="feature-actions">
                <Link to="/dashboard" className="feature-link">
                  <span>Manage Tokens</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Decentralized Governance</h3>
              <p>
                Participate in community-driven decisions. Vote on proposals, 
                manage protocol parameters, and shape the future of BQBTC ecosystem.
              </p>
              <div className="feature-actions">
                <Link to="/governance" className="feature-link">
                  <span>View Proposals</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Insurance Coverage</h3>
              <p>
                Protect your investments with comprehensive coverage options. 
                Smart contract insurance and risk management tools for peace of mind.
              </p>
              <div className="feature-actions">
                <Link to="/cover" className="feature-link">
                  <span>Get Coverage</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💧</div>
              <h3>Liquidity Pools</h3>
              <p>
                Provide liquidity and earn rewards. Access deep liquidity pools 
                with competitive yields and automated market-making strategies.
              </p>
              <div className="feature-actions">
                <Link to="/pool" className="feature-link">
                  <span>Join Pools</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="tech-stack" id="technology">
        <div className="tech-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">🔬</span>
              <span>Technology</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">Cutting-Edge Technology</span>
            </h2>
            <p className="section-subtitle">
              Built on the most advanced blockchain technology available
            </p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-logo">🌐</div>
              <h4>Internet Computer</h4>
              <p>World's first web-speed blockchain</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">🔗</div>
              <h4>Chain Key Technology</h4>
              <p>Advanced cryptography & consensus</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">⚡</div>
              <h4>Canister Smart Contracts</h4>
              <p>Scalable & persistent execution</p>
            </div>
            <div className="tech-item">
              <div className="tech-logo">🛡️</div>
              <h4>Threshold Signatures</h4>
              <p>Military-grade security</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">🎯</span>
              <span>About BQBTC</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">Built for the Future</span>
            </h2>
            <p className="section-subtitle">
              Combining the best of traditional finance with blockchain innovation
            </p>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <p className="about-description">
                BQBTC is built on the Internet Computer, providing unprecedented scalability, 
                security, and decentralization. Our protocol combines the best of traditional 
                finance with the innovation of blockchain technology to create a truly 
                next-generation DeFi experience.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <span className="stat-number">$10M+</span>
                  <span className="stat-label">Total Value Locked</span>
                </div>
                <div className="about-stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Active Users</span>
                </div>
                <div className="about-stat">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
            <div className="about-features">
              <div className="about-feature">
                <div className="about-icon">🔒</div>
                <h3>Secure</h3>
                <p>Enterprise-grade security with multi-layer protection</p>
              </div>
              <div className="about-feature">
                <div className="about-icon">⚡</div>
                <h3>Fast</h3>
                <p>Lightning-fast transactions with instant finality</p>
              </div>
              <div className="about-feature">
                <div className="about-icon">🌐</div>
                <h3>Decentralized</h3>
                <p>True decentralization with community governance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats" id="stats">
        <div className="stats-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="gradient-text">Platform Statistics</span>
            </h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <h3>$10M+</h3>
              <p>Total Value Locked</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <h3>50K+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⚡</div>
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🌍</div>
              <h3>24/7</h3>
              <p>Global Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🚀</span>
              <span className="logo-text">BQBTC</span>
            </div>
            <p>
              Building the future of decentralized finance on the Internet Computer. 
              Secure, scalable, and user-friendly DeFi solutions.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#icp-benefits">ICP Benefits</a>
              <a href="#technology">Technology</a>
              <a href="#about">About</a>
              <a href="#stats">Statistics</a>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Products</h4>
            <div className="footer-links">
              <Link to="/dashboard">Token Management</Link>
              <Link to="/governance">Governance</Link>
              <Link to="/cover">Insurance Cover</Link>
              <Link to="/pool">Liquidity Pools</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Community</h4>
            <div className="footer-links">
              <a href="#">Twitter</a>
              <a href="#">Discord</a>
              <a href="#">Telegram</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 BQBTC Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
