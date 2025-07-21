

import { Link } from 'react-router-dom';

const Pool = () => {
  return (
    <div className="dashboard-page">
      <Link to="/" className="back-btn">← Back to Home</Link>
      
      <div className="dashboard-header">
        <h1>💧 Liquidity Pools</h1>
        <p>Provide liquidity and earn rewards in decentralized trading pools</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>🏊‍♂️ Available Pools</h2>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>BQBTC / ICP</h3>
                <span style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  Hot 🔥
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>TVL</p>
                  <strong>$2.4M</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>APR</p>
                  <strong style={{ color: '#4caf50' }}>24.5%</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Fee</p>
                  <strong>0.3%</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>Add Liquidity</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>Remove</button>
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(118, 75, 162, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>BQBTC / ckBTC</h3>
                <span style={{ background: 'rgba(255, 193, 7, 0.2)', color: '#ffc107', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  New ✨
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>TVL</p>
                  <strong>$1.8M</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>APR</p>
                  <strong style={{ color: '#4caf50' }}>32.1%</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Fee</p>
                  <strong>0.25%</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>Add Liquidity</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>Remove</button>
              </div>
            </div>
            
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(240, 147, 251, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>BQBTC / ckETH</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>TVL</p>
                  <strong>$950K</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>APR</p>
                  <strong style={{ color: '#4caf50' }}>18.7%</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ opacity: '0.7', fontSize: '0.9rem' }}>Fee</p>
                  <strong>0.3%</strong>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>Add Liquidity</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}>Remove</button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>💰 My Liquidity</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="balance-display" style={{ marginBottom: '1rem' }}>
              Total Value: <strong>$12,450</strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h4>Active Positions</h4>
                <strong style={{ color: '#667eea', fontSize: '1.5rem' }}>2</strong>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h4>Unclaimed Rewards</h4>
                <strong style={{ color: '#4caf50', fontSize: '1.5rem' }}>$128.50</strong>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: '1rem', padding: '0.75rem 2rem' }}>
              🎁 Claim All Rewards
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📈 Pool Analytics</h2>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h4>24h Volume</h4>
                <strong style={{ color: '#667eea', fontSize: '1.2rem' }}>$245K</strong>
                <p style={{ color: '#4caf50', fontSize: '0.8rem' }}>↗ +12.5%</p>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h4>24h Fees</h4>
                <strong style={{ color: '#764ba2', fontSize: '1.2rem' }}>$735</strong>
                <p style={{ color: '#4caf50', fontSize: '0.8rem' }}>↗ +8.3%</p>
              </div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '1rem' }}>Pool Performance</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>BQBTC/ICP</span>
                <span style={{ color: '#4caf50' }}>+15.2% APY</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>BQBTC/ckBTC</span>
                <span style={{ color: '#4caf50' }}>+22.8% APY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>➕ Add Liquidity</h2>
          <div className="input-group">
            <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white' }}>
              <option>Select Pool</option>
              <option>BQBTC / ICP</option>
              <option>BQBTC / ckBTC</option>
              <option>BQBTC / ckETH</option>
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="number" placeholder="Token A Amount" />
              <input type="number" placeholder="Token B Amount" />
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Pool Share:</span>
                <strong>0.15%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Est. APR:</span>
                <strong style={{ color: '#4caf50' }}>24.5%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Network Fee:</span>
                <strong>~$0.05</strong>
              </div>
            </div>
            <button className="btn-primary">💧 Add Liquidity</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn-secondary">🪙 Token Dashboard</Link>
          <Link to="/governance" className="btn-secondary">🏛️ Governance</Link>
          <Link to="/cover" className="btn-secondary">🛡️ Insurance Cover</Link>
        </div>
      </div>
    </div>
  );
};

export default Pool;
