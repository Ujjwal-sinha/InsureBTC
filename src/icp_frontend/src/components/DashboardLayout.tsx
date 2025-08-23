import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title = 'Dashboard',
  subtitle = 'Manage your DeFi portfolio'
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile menu toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
        style={{
          display: 'none',
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 200,
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '0.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ☰
      </button>

      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="main-content">
        <div className="dashboard-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <Link to="/" className="back-btn">
              ← Back to Home
            </Link>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
