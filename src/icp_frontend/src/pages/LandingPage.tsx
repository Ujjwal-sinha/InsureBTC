
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
          <div className="logo">BQBTC</div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#stats">Stats</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <Link to="/dashboard" className="dashboard-btn">
            Launch Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="gradient-text">The Future of</span>
              <br />
              <span className="gradient-text">Decentralized Finance</span>
            </h1>
            <p>
              Experience next-generation DeFi with BQBTC - your gateway to governance, 
              liquidity pools, insurance coverage, and seamless token management on the Internet Computer.
            </p>
            <div className="cta-buttons">
              <Link to="/dashboard" className="btn-primary">
                <span>🚀 Get Started</span>
                <div className="btn-glow"></div>
              </Link>
              <a href="#features" className="btn-secondary">
                <span>🔍 Learn More</span>
              </a>
            </div>
          </div>
          
          {/* Hero Stats */}
          <div className="hero-stats-container">
            <HeroStats />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <h2 className="section-title">
            <span className="gradient-text">Powerful DeFi Features</span>
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🪙</div>
              <h3>Token Management</h3>
              <p>
                Mint, burn, and transfer BQBTC tokens with ease. Full control over your digital assets 
                with enterprise-grade security on the Internet Computer.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Decentralized Governance</h3>
              <p>
                Participate in community-driven decisions. Vote on proposals, 
                manage protocol parameters, and shape the future of BQBTC ecosystem.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Insurance Coverage</h3>
              <p>
                Protect your investments with comprehensive coverage options. 
                Smart contract insurance and risk management tools for peace of mind.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💧</div>
              <h3>Liquidity Pools</h3>
              <p>
                Provide liquidity and earn rewards. Access deep liquidity pools 
                with competitive yields and automated market-making strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-container">
          <h2 className="section-title">
            <span className="gradient-text">Built for the Future</span>
          </h2>
          <p className="about-description">
            BQBTC is built on the Internet Computer, providing unprecedented scalability, 
            security, and decentralization. Our protocol combines the best of traditional 
            finance with the innovation of blockchain technology.
          </p>
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
      </section>

      {/* Statistics Section */}
      <section className="stats" id="stats">
        <div className="stats-container">
          <div className="stat-item">
            <h3>$10M+</h3>
            <p>Total Value Locked</p>
          </div>
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Global Access</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-section">
            <h4>BQBTC Protocol</h4>
            <p>
              Building the future of decentralized finance on the Internet Computer. 
              Secure, scalable, and user-friendly DeFi solutions.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div>
              <a href="#features">Features</a><br />
              <a href="#about">About</a><br />
              <a href="#stats">Statistics</a><br />
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Products</h4>
            <div>
              <Link to="/dashboard">Token Management</Link><br />
              <Link to="/governance">Governance</Link><br />
              <Link to="/cover">Insurance Cover</Link><br />
              <Link to="/pool">Liquidity Pools</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Community</h4>
            <div>
              <a href="#">Twitter</a><br />
              <a href="#">Discord</a><br />
              <a href="#">Telegram</a><br />
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 BQBTC Protocol. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
