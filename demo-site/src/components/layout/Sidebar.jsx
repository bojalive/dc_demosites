import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MI } from '../ui';
import { config } from '../../config/customer';

export function Sidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { company, nav } = config;

  const go = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 199,
          }}
        />
      )}

      <aside
        className={`sidebar${mobileOpen ? ' open' : ''}`}
        style={{
          width: 'var(--sidebar-w)',
          height: '100vh',
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 200,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform .25s ease',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div style={{
          padding: '16px 18px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: company.accentGradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '.78rem', fontWeight: 800, color: '#fff', letterSpacing: -1 }}>
              {company.initials}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
              {company.shortName}
            </div>
            <div style={{ fontSize: '.62rem', color: 'var(--text-mute)', letterSpacing: .3 }}>
              {company.location}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 12px', overflowY: 'auto' }}>
          {nav.map((item) => {
            const active = location.pathname === item.path ||
              (item.path === '/' && location.pathname === '/');
            return (
              <button
                key={item.id}
                onClick={() => go(item.path)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 10px', margin: '1px 0',
                  border: 'none', borderRadius: 7, cursor: 'pointer',
                  fontSize: '.75rem', fontWeight: active ? 600 : 400,
                  color: active ? company.accentColor : 'var(--text-dim)',
                  background: active ? `${company.accentColor}15` : 'transparent',
                  textAlign: 'left', transition: 'all .15s ease',
                }}
              >
                <MI size={17} style={{ color: active ? company.accentColor : 'var(--text-mute)' }}>
                  {item.icon}
                </MI>
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '12px 18px',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: company.accentGradient,
            color: '#fff', fontSize: '.62rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            DU
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '.74rem', fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Demo User
            </div>
            <div style={{ fontSize: '.62rem', color: 'var(--text-mute)' }}>
              Viewer
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
