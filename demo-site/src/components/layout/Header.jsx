import React from 'react';
import { useLocation } from 'react-router-dom';
import { MI } from '../ui';
import { config } from '../../config/customer';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/features': 'Features',
  '/contact': 'Contact',
};

export function Header({ onMenuClick }) {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'Dashboard';
  const { company } = config;

  return (
    <div style={{
      height: 52,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 24,
      borderBottom: '1px solid var(--border)',
      paddingBottom: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-dim)', padding: 4,
          }}
          className="hamburger"
        >
          <MI size={22}>menu</MI>
        </button>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: -.3, color: 'var(--text)' }}>
            {title}
          </div>
          <div style={{ fontSize: '.68rem', color: 'var(--text-mute)' }}>
            {company.name}
          </div>
        </div>
      </div>

      <div style={{
        fontSize: '.7rem', color: 'var(--text-mute)',
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: 6, padding: '4px 10px',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <MI size={13} style={{ color: '#059669' }}>circle</MI>
        Demo Mode
      </div>
    </div>
  );
}

/* Inject hamburger visibility via a style tag trick */
export function HamburgerStyle() {
  return (
    <style>{`
      @media (max-width: 768px) {
        .hamburger { display: flex !important; }
      }
    `}</style>
  );
}
