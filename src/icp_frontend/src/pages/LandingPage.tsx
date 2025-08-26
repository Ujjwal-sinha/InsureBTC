
import React, { useRef, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup - Web3 aesthetic
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
    renderer.setClearColor(0x000000, 0);

    // Create blockchain-inspired particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 400;
      posArray[i + 1] = (Math.random() - 0.5) * 400;
      posArray[i + 2] = (Math.random() - 0.5) * 400;

      // Crypto-inspired colors (blue, purple, cyan)
      const colors = [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x10b981];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const colorObj = new THREE.Color(color);
      colorArray[i] = colorObj.r;
      colorArray[i + 1] = colorObj.g;
      colorArray[i + 2] = colorObj.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create blockchain network effect
    const createBlockchainNetwork = () => {
      const networkGeometry = new THREE.BufferGeometry();
      const networkPositions = [];
      const networkColors = [];

      // Create network nodes
      for (let i = 0; i < 20; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;

        networkPositions.push(x, y, z);
        networkColors.push(0.2, 0.6, 1.0); // Blue nodes
      }

      // Create connections between nodes
      for (let i = 0; i < 15; i++) {
        const node1 = Math.floor(Math.random() * 20) * 3;
        const node2 = Math.floor(Math.random() * 20) * 3;

        networkPositions.push(
          networkPositions[node1], networkPositions[node1 + 1], networkPositions[node1 + 2],
          networkPositions[node2], networkPositions[node2 + 1], networkPositions[node2 + 2]
        );
        networkColors.push(0.1, 0.4, 0.8, 0.1, 0.4, 0.8); // Connection lines
      }

      networkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(networkPositions, 3));
      networkGeometry.setAttribute('color', new THREE.Float32BufferAttribute(networkColors, 3));

      const networkMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
      });

      return new THREE.LineSegments(networkGeometry, networkMaterial);
    };

    const network = createBlockchainNetwork();
    scene.add(network);

    camera.position.z = 100;

    // Web3-style animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate particles with blockchain effect
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      // Animate network
      network.rotation.y += 0.002;
      network.rotation.x += 0.001;

      // Pulse effect for particles
      particlesMaterial.opacity = 0.4 + Math.sin(time * 2) * 0.2;

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
      {/* Web3 Three.js Canvas Background */}
      <canvas ref={canvasRef} className="three-canvas" />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/logo.png" alt="InsureBTC" className="logo-image" />
            <span className="logo-badge"> INSUREBTC PROTOCOL</span>
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#icp-benefits">ICP Benefits</a></li>
            <li><a href="#technology">Technology</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#stats">Stats</a></li>
          </ul>
          <Link to="/dashboard" className="dashboard-btn">
            <span className="btn-icon">🚀</span>
            <span>Launch App</span>
            <div className="btn-glow"></div>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon"></span>
              <span>INSUREBTC PROTOCOL</span>
            </div>
            <h1>
              <span className="gradient-text">InsureBTC</span>
            </h1>
            <p className="hero-subtitle">
              Next-Generation DeFi Protocol
            </p>
            <p className="hero-description">
              Revolutionary decentralized finance platform built on Internet Computer.
              Secure insurance coverage, lightning-fast transactions, and comprehensive DeFi solutions.
            </p>
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
        </div>

        {/* Web3 Floating Elements */}
        <div className="floating-elements">
          <div className="floating-card blockchain-card" style={{ animationDelay: '0s' }}>
            <div className="card-icon">🪙</div>
            <div className="card-text">Token Management</div>
            <div className="card-glow"></div>
          </div>
          <div className="floating-card blockchain-card" style={{ animationDelay: '1s' }}>
            <div className="card-icon">🏛️</div>
            <div className="card-text">Governance</div>
            <div className="card-glow"></div>
          </div>
          <div className="floating-card blockchain-card" style={{ animationDelay: '2s' }}>
            <div className="card-icon">🛡️</div>
            <div className="card-text">Insurance</div>
            <div className="card-glow"></div>
          </div>
          <div className="floating-card blockchain-card" style={{ animationDelay: '3s' }}>
            <div className="card-icon">💧</div>
            <div className="card-text">Liquidity</div>
            <div className="card-glow"></div>
          </div>
        </div>

        {/* Web3 Background Elements */}
        <div className="web3-bg-elements">
          <div className="bg-element hexagon"></div>
          <div className="bg-element hexagon"></div>
          <div className="bg-element hexagon"></div>
          <div className="bg-element circle"></div>
          <div className="bg-element circle"></div>
        </div>
      </section>

      {/* ICP Benefits Section */}
      <section className="icp-benefits" id="icp-benefits">
        <div className="icp-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">⚡</span>
              <span>WHY INTERNET COMPUTER?</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">REVOLUTIONARY TECHNOLOGY</span>
            </h2>
            <p className="section-subtitle">
              Discover how ICP revolutionizes DeFi with unmatched performance, security, and decentralization
            </p>
          </div>

          <div className="icp-grid">
            <div className="icp-card blockchain-card">
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
              <div className="card-glow"></div>
            </div>

            <div className="icp-card blockchain-card">
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
              <div className="card-glow"></div>
            </div>

            <div className="icp-card blockchain-card">
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
              <div className="card-glow"></div>
            </div>

            <div className="icp-card blockchain-card">
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
              <div className="card-glow"></div>
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
              <span>DEFI FEATURES</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">COMPLETE DEFI SUITE</span>
            </h2>
            <p className="section-subtitle">
              Everything you need for modern decentralized finance in one platform
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card blockchain-card">
              <div className="feature-icon">🪙</div>
              <h3>Token Management</h3>
              <p>
                Mint, burn, and transfer InsureBTC tokens with ease. Full control over your digital assets
                with enterprise-grade security on the Internet Computer.
              </p>
              <div className="feature-actions">
                <Link to="/dashboard" className="feature-link">
                  <span>Manage Tokens</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
              <div className="card-glow"></div>
            </div>
            <div className="feature-card blockchain-card">
              <div className="feature-icon">🏛️</div>
              <h3>Decentralized Governance</h3>
              <p>
                Participate in community-driven decisions. Vote on proposals,
                manage protocol parameters, and shape the future of InsureBTC ecosystem.
              </p>
              <div className="feature-actions">
                <Link to="/governance" className="feature-link">
                  <span>View Proposals</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
              <div className="card-glow"></div>
            </div>
            <div className="feature-card blockchain-card">
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
              <div className="card-glow"></div>
            </div>
            <div className="feature-card blockchain-card">
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
              <div className="card-glow"></div>
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
              <span>TECHNOLOGY</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">CUTTING-EDGE TECHNOLOGY</span>
            </h2>
            <p className="section-subtitle">
              Built on the most advanced blockchain technology available
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-item blockchain-card">
              <div className="tech-logo">🌐</div>
              <h4>Internet Computer</h4>
              <p>World's first web-speed blockchain</p>
              <div className="card-glow"></div>
            </div>
            <div className="tech-item blockchain-card">
              <div className="tech-logo">🔗</div>
              <h4>Chain Key Technology</h4>
              <p>Advanced cryptography & consensus</p>
              <div className="card-glow"></div>
            </div>
            <div className="tech-item blockchain-card">
              <div className="tech-logo">⚡</div>
              <h4>Canister Smart Contracts</h4>
              <p>Scalable & persistent execution</p>
              <div className="card-glow"></div>
            </div>
            <div className="tech-item blockchain-card">
              <div className="tech-logo">🛡️</div>
              <h4>Threshold Signatures</h4>
              <p>Military-grade security</p>
              <div className="card-glow"></div>
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
              <span>ABOUT InsureBTC</span>
            </div>
            <h2 className="section-title">
              <span className="gradient-text">BUILT FOR THE FUTURE</span>
            </h2>
            <p className="section-subtitle">
              Combining the best of traditional finance with blockchain innovation
            </p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <p className="about-description">
                InsureBTC is built on the Internet Computer, providing unprecedented scalability,
                security, and decentralization. Our protocol combines the best of traditional
                finance with the innovation of blockchain technology to create a truly
                next-generation DeFi experience.
              </p>
              <div className="about-stats">
                <div className="about-stat blockchain-card">
                  <span className="stat-number">$10M+</span>
                  <span className="stat-label">Total Value Locked</span>
                  <div className="card-glow"></div>
                </div>
                <div className="about-stat blockchain-card">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Active Users</span>
                  <div className="card-glow"></div>
                </div>
                <div className="about-stat blockchain-card">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                  <div className="card-glow"></div>
                </div>
              </div>
            </div>
            <div className="about-features">
              <div className="about-feature blockchain-card">
                <div className="about-icon">🔒</div>
                <h3>Secure</h3>
                <p>Enterprise-grade security with multi-layer protection</p>
                <div className="card-glow"></div>
              </div>
              <div className="about-feature blockchain-card">
                <div className="about-icon">⚡</div>
                <h3>Fast</h3>
                <p>Lightning-fast transactions with instant finality</p>
                <div className="card-glow"></div>
              </div>
              <div className="about-feature blockchain-card">
                <div className="about-icon">🌐</div>
                <h3>Decentralized</h3>
                <p>True decentralization with community governance</p>
                <div className="card-glow"></div>
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
              <span className="gradient-text">PLATFORM STATISTICS</span>
            </h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item blockchain-card">
              <div className="stat-icon">💰</div>
              <h3>$10M+</h3>
              <p>Total Value Locked</p>
              <div className="card-glow"></div>
            </div>
            <div className="stat-item blockchain-card">
              <div className="stat-icon">👥</div>
              <h3>50K+</h3>
              <p>Active Users</p>
              <div className="card-glow"></div>
            </div>
            <div className="stat-item blockchain-card">
              <div className="stat-icon">⚡</div>
              <h3>99.9%</h3>
              <p>Uptime</p>
              <div className="card-glow"></div>
            </div>
            <div className="stat-item blockchain-card">
              <div className="stat-icon">🌍</div>
              <h3>24/7</h3>
              <p>Global Access</p>
              <div className="card-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
