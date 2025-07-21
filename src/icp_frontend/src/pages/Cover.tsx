
import React from 'react';
import { Link } from 'react-router-dom';

const Cover = () => {
  return (
    <div className="dashboard-page">
      <Link to="/" className="back-btn">← Back to Home</Link>
      
      <div className="dashboard-header">
        <h1>🛡️ Insurance Cover</h1>
        <p>Protect your DeFi investments with comprehensive insurance coverage</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>📋 Available Coverage</h2>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
              <h3>Smart Contract Risk Coverage</h3>
              <p style={{ opacity: '0.8', margin: '0.5rem 0' }}>Protection against smart contract vulnerabilities and exploits</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span>Premium: <strong>0.5% APY</strong></span>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Purchase</button>
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(118, 75, 162, 0.3)' }}>
              <h3>Liquidity Pool Protection</h3>
              <p style={{ opacity: '0.8', margin: '0.5rem 0' }}>Coverage against impermanent loss and pool exploits</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span>Premium: <strong>0.8% APY</strong></span>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Purchase</button>
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(240, 147, 251, 0.3)' }}>
              <h3>Protocol Risk Coverage</h3>
              <p style={{ opacity: '0.8', margin: '0.5rem 0' }}>Comprehensive protocol-level risk protection</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span>Premium: <strong>1.2% APY</strong></span>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Purchase</button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📊 My Coverage</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="balance-display" style={{ marginBottom: '1rem' }}>
              Total Coverage: <strong>$25,000</strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h4>Active Policies</h4>
                <strong style={{ color: '#667eea', fontSize: '1.5rem' }}>3</strong>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h4>Monthly Premium</h4>
                <strong style={{ color: '#764ba2', fontSize: '1.5rem' }}>$18.50</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>🔄 Claims History</h2>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4>Claim #CL001</h4>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Smart Contract Coverage</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>✅ Approved</span>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>$2,500</p>
                </div>
              </div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4>Claim #CL002</h4>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Pool Protection</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#ff9800', fontWeight: 'bold' }}>⏳ Pending</span>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>$1,200</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📄 File New Claim</h2>
          <div className="input-group">
            <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white' }}>
              <option>Select Coverage Type</option>
              <option>Smart Contract Risk</option>
              <option>Liquidity Pool Protection</option>
              <option>Protocol Risk</option>
            </select>
            <input type="number" placeholder="Claim Amount (USD)" />
            <textarea placeholder="Incident Description" rows={3} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white', resize: 'vertical' }}></textarea>
            <button className="btn-primary">📤 Submit Claim</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn-secondary">🪙 Token Dashboard</Link>
          <Link to="/governance" className="btn-secondary">🏛️ Governance</Link>
          <Link to="/pool" className="btn-secondary">💧 Liquidity Pools</Link>
        </div>
      </div>
    </div>
  );
};

export default Cover;
