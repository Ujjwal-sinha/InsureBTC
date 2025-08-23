
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Cover: React.FC = () => {
  return (
    <DashboardLayout title="Insurance Cover" subtitle="Protect your investments with comprehensive coverage">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>🛡️ Active Coverage</h2>
          <div style={{ 
            background: '#f8fafc', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0',
            marginBottom: '1.5rem'
          }}>
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
              No active coverage found. Purchase coverage to protect your investments.
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
            Purchase Coverage
          </button>
        </div>

        <div className="dashboard-card">
          <h2>💰 Coverage Pool</h2>
          <div style={{ 
            background: 'linear-gradient(135deg, #10b981, #059669)', 
            color: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Pool Value</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>
              $2.5M
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>
              Available for claims
            </div>
          </div>
          
          <div style={{ 
            background: '#f0f9ff', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #bae6fd'
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0369a1' }}>
              Pool Statistics
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0c4a6e', marginTop: '0.5rem' }}>
              Active Policies: 1,247<br />
              Claims Paid: $450K<br />
              Success Rate: 98.5%
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📋 Available Plans</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              background: '#f8fafc', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: '#1a202c', margin: 0 }}>Basic Coverage</h4>
                <span style={{ 
                  background: '#10b981', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  $50/month
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                Covers smart contract vulnerabilities and basic risks
              </p>
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Select Plan
              </button>
            </div>
            
            <div style={{ 
              background: '#f8fafc', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: '#1a202c', margin: 0 }}>Premium Coverage</h4>
                <span style={{ 
                  background: '#f59e0b', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  $150/month
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                Comprehensive coverage including market risks and advanced protection
              </p>
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Select Plan
              </button>
            </div>
            
            <div style={{ 
              background: '#f8fafc', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: '#1a202c', margin: 0 }}>Enterprise Coverage</h4>
                <span style={{ 
                  background: '#8b5cf6', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  Custom
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                Tailored coverage for large institutions and high-value portfolios
              </p>
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📊 Claims History</h2>
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
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Claim #001</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Smart contract exploit</div>
              </div>
              <div style={{ 
                background: '#10b981', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                Paid
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
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Claim #002</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Market volatility loss</div>
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
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 0'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Claim #003</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Liquidation event</div>
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cover;
