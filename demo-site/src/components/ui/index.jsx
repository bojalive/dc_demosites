import React from 'react';

export function MI({ children, size = 20, style = {} }) {
  return (
    <span
      className="material-symbols-rounded"
      style={{ fontSize: size, lineHeight: 1, userSelect: 'none', flexShrink: 0, ...style }}
    >
      {children}
    </span>
  );
}

export function KpiCard({ label, value, sub, icon, change, changeType }) {
  const isUp = changeType === 'up';
  const isDn = changeType === 'dn';
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: .5 }}>
          {label}
        </span>
        <div style={{
          width: 30, height: 30, borderRadius: 7,
          background: isUp ? '#05966920' : isDn ? '#dc262620' : '#0891b220',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <MI size={16} style={{ color: isUp ? '#059669' : isDn ? '#dc2626' : '#0891b2' }}>{icon}</MI>
        </div>
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: -.5, color: 'var(--text)', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: '.7rem', color: 'var(--text-mute)', marginTop: 4 }}>{sub}</div>
      {change && (
        <div style={{
          marginTop: 10, fontSize: '.68rem', fontWeight: 600,
          color: isUp ? '#059669' : isDn ? '#dc2626' : 'var(--text-mute)',
          display: 'flex', alignItems: 'center', gap: 3,
        }}>
          <MI size={13}>{isUp ? 'arrow_upward' : isDn ? 'arrow_downward' : 'remove'}</MI>
          {change}
        </div>
      )}
    </div>
  );
}

export function HealthRing({ name, health, color }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (health / 100) * circ;

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}>
      <svg width={64} height={64} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={32} cy={32} r={r} fill="none" stroke="var(--border)" strokeWidth={5} />
        <circle
          cx={32} cy={32} r={r}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray .5s ease' }}
        />
      </svg>
      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginTop: -48, marginBottom: 32, lineHeight: 1 }}>
        {health}%
      </div>
      <div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-dim)', textAlign: 'center' }}>{name}</div>
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '.86rem', fontWeight: 700, letterSpacing: -.2,
      color: 'var(--text)', marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

export function Badge({ children, color }) {
  return (
    <span style={{
      fontSize: '.62rem', fontWeight: 600, padding: '2px 7px',
      borderRadius: 4, background: `${color}18`, color,
      border: `1px solid ${color}30`,
    }}>
      {children}
    </span>
  );
}
