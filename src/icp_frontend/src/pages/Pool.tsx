

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Pool: React.FC = () => {
  return (
    <DashboardLayout title="Liquidity Pool" subtitle="Provide liquidity and earn rewards">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>💧 My Liquidity</h2>
          <div style={{ 
            background: '#f8fafc', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0',
            marginBottom: '1.5rem'
          }}>
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
              No liquidity positions found. Add liquidity to start earning rewards.
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
            Add Liquidity
          </button>
        </div>

        <div className="dashboard-card">
          <h2>💰 Pool Overview</h2>
          <div style={{ 
            background: 'linear-gradient(135deg, #10b981, #059669)', 
            color: 'white', 
            padding: '1.5rem', 
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Value Locked</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>
              $5.2M
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.5rem' }}>
              Across all pools
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
              Active Pools: 12<br />
              Total Liquidity Providers: 847<br />
              Average APY: 15.2%
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>🏊 Available Pools</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              background: '#f8fafc', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: '#1a202c', margin: 0 }}>BQBTC/ICP</h4>
                <span style={{ 
                  background: '#10b981', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  18.5% APY
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                TVL: $2.1M | Volume: $450K (24h)
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
                Add Liquidity
              </button>
            </div>
            
            <div style={{ 
              background: '#f8fafc', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: '#1a202c', margin: 0 }}>BQBTC/USDC</h4>
                <span style={{ 
                  background: '#f59e0b', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  12.3% APY
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                TVL: $1.8M | Volume: $320K (24h)
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
                Add Liquidity
              </button>
            </div>
            
            <div style={{ 
              background: '#f8fafc', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: '#1a202c', margin: 0 }}>BQBTC/ETH</h4>
                <span style={{ 
                  background: '#8b5cf6', 
                  color: 'white', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  22.1% APY
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                TVL: $1.3M | Volume: $280K (24h)
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
                Add Liquidity
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📈 Rewards & Earnings</h2>
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
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Total Earned</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>All time rewards</div>
              </div>
              <div style={{ 
                background: '#10b981', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                0 BQBTC
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
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Pending Rewards</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Available to claim</div>
              </div>
              <div style={{ 
                background: '#f59e0b', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                0 BQBTC
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 0'
            }}>
              <div>
                <div style={{ fontWeight: '600', color: '#1a202c' }}>Average APY</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Current yield</div>
              </div>
              <div style={{ 
                background: '#8b5cf6', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                0%
              </div>
            </div>
          </div>
          
          <button style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            marginTop: '1rem',
            width: '100%'
          }}>
            Claim Rewards
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pool;
