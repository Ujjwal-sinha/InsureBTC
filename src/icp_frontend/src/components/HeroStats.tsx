import React from 'react';

const HeroStats: React.FC = () => {
  const stats = [
    {
      value: '$10.2M',
      label: 'Total Value Locked',
      icon: '💰',
      color: '#3b82f6'
    },
    {
      value: '2,847',
      label: 'Active Users',
      icon: '👥',
      color: '#10b981'
    },
    {
      value: '12.5%',
      label: 'Average APY',
      icon: '📈',
      color: '#f59e0b'
    },
    {
      value: '99.9%',
      label: 'Uptime',
      icon: '⚡',
      color: '#ef4444'
    }
  ];

  return (
    <div className="hero-stats">
      {stats.map((stat, index) => (
        <div key={index} className="hero-stat-item">
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <h3 style={{ color: stat.color, marginBottom: '0.5rem' }}>
            {stat.value}
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', fontWeight: '500' }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
