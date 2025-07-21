

import { Link } from 'react-router-dom';

const Governance = () => {
  return (
    <div className="dashboard-page">
      <Link to="/" className="back-btn">← Back to Home</Link>
      
      <div className="dashboard-header">
        <h1>🏛️ Governance</h1>
        <p>Participate in decentralized governance and shape the future of BQBTC</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>📊 Active Proposals</h2>
          <p>View and vote on active governance proposals</p>
          <div className="feature-placeholder">
            <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', margin: '1rem 0' }}>
              <h3>🗳️ Proposal #001</h3>
              <p>Increase mint limit to 100M BQBTC</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>👍 Vote Yes</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>👎 Vote No</button>
              </div>
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', margin: '1rem 0' }}>
              <h3>🗳️ Proposal #002</h3>
              <p>Update governance parameters</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>👍 Vote Yes</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>👎 Vote No</button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📝 Create Proposal</h2>
          <div className="input-group">
            <input type="text" placeholder="Proposal Title" />
            <textarea placeholder="Proposal Description" rows={4} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white', resize: 'vertical' }}></textarea>
            <button className="btn-primary">🚀 Submit Proposal</button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>👥 Voting Power</h2>
          <div className="balance-display">
            Your Voting Power: <strong>1,250 BQBTC</strong>
          </div>
          <p style={{ marginTop: '1rem', opacity: '0.7' }}>
            Voting power is based on your BQBTC token holdings. The more tokens you hold, the more influence you have in governance decisions.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>📈 Governance Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ color: '#667eea' }}>15</h3>
              <p>Active Proposals</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ color: '#764ba2' }}>892K</h3>
              <p>Total Votes Cast</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ color: '#f093fb' }}>67%</h3>
              <p>Participation Rate</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h3 style={{ color: '#ffa726' }}>48</h3>
              <p>Passed Proposals</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn-secondary">🪙 Token Dashboard</Link>
          <Link to="/cover" className="btn-secondary">🛡️ Insurance Cover</Link>
          <Link to="/pool" className="btn-secondary">💧 Liquidity Pools</Link>
        </div>
      </div>
    </div>
  );
};

export default Governance;
