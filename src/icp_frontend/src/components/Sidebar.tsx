import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const location = useLocation();

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Overview & Analytics'
    },
    {
      path: '/governance',
      label: 'Governance',
      icon: '🏛️',
      description: 'Vote & Proposals'
    },
    {
      path: '/cover',
      label: 'Insurance Cover',
      icon: '🛡️',
      description: 'Risk Management'
    },
    {
      path: '/pool',
      label: 'Liquidity Pool',
      icon: '💧',
      description: 'Liquidity & Staking'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99
          }}
        />
      )}
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">BQBTC</div>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            DeFi Protocol
          </p>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={onToggle}
            >
              <span className="nav-icon">{item.icon}</span>
              <div>
                <div style={{ fontWeight: '600' }}>{item.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </nav>
        
        <div style={{ 
          padding: '1.5rem', 
          borderTop: '1px solid #e5e7eb', 
          marginTop: 'auto',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          background: '#ffffff'
        }}>
          <div style={{ 
            background: '#f0f9ff', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #bae6fd'
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0369a1' }}>
              Quick Stats
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0c4a6e', marginTop: '0.5rem' }}>
              TVL: $10.2M<br />
              Users: 2,847<br />
              APY: 12.5%
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
