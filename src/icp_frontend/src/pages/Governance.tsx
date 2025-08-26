

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Governance: React.FC = () => {
  return (
    <DashboardLayout title="Governance" subtitle="Vote on proposals and manage protocol parameters">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>🏛️ Active Proposals</h2>
          <div style={{ 
            background: '#f8fafc', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0',
            marginBottom: '1.5rem'
          }}>
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
              No active proposals at the moment. Check back later for new governance proposals.
            </p>
          </div>
          
          <button style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Create New Proposal
          </button>
        </div>

        <div className="dashboard-card">
          <h2>📊 Voting Power</h2>
          <div style={{ 
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
            color: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Your Voting Power</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>
              0 InsureBTC
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>
              Stake tokens to participate in governance
            </div>
          </div>
          
          <button style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Stake Tokens
          </button>
        </div>

        <div className="dashboard-card">
          <h2>📈 Recent Activity</h2>
          <div style={{ 
            background: '#f8fafc', 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Proposal #001</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Increase protocol fees</div>
              </div>
              <div style={{ 
                background: '#10b981', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Passed
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Proposal #002</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Add new token pair</div>
              </div>
              <div style={{ 
                background: '#ef4444', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Rejected
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 0'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Proposal #003</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Update governance parameters</div>
              </div>
              <div style={{ 
                background: '#f59e0b', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Pending
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>⚙️ Protocol Parameters</h2>
          <div style={{ 
            background: '#f8fafc', 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ color: '#4a5568' }}>Minimum Proposal Threshold</span>
              <span style={{ fontWeight: '600', color: '#1a202c' }}>1,000 InsureBTC</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ color: '#4a5568' }}>Voting Period</span>
              <span style={{ fontWeight: '600', color: '#1a202c' }}>7 days</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ color: '#4a5568' }}>Quorum Required</span>
              <span style={{ fontWeight: '600', color: '#1a202c' }}>10%</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.5rem 0'
            }}>
              <span style={{ color: '#4a5568' }}>Execution Delay</span>
              <span style={{ fontWeight: '600', color: '#1a202c' }}>24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Governance;
