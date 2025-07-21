
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

const LandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x667eea,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create animated torus
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x764ba2,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    camera.position.z = 30;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles and torus
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="landing-page">
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
          <h1>The Future of Decentralized Finance</h1>
          <p>
            Experience next-generation DeFi with BQBTC - your gateway to governance, 
            liquidity pools, insurance coverage, and seamless token management on the Internet Computer.
          </p>
          <div className="cta-buttons">
            <Link to="/dashboard" className="btn-primary">
              Get Started
            </Link>
            <a href="#features" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <h2 className="section-title">Powerful DeFi Features</h2>
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
      </footer>
    </div>
  );
};

export default LandingPage;
