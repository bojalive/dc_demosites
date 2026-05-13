import React from 'react';
import { MI, SectionLabel, Badge } from '../components/ui';
import { config } from '../config/customer';

export function Products() {
  const { company, products } = config;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: -.5, color: 'var(--text)', lineHeight: 1.2 }}>
          Our Products
        </h1>
        <p style={{ fontSize: '.78rem', color: 'var(--text-mute)', marginTop: 4 }}>
          {company.name} — {company.tagline}
        </p>
      </div>

      <SectionLabel>Product Lines</SectionLabel>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            display: 'flex', flexDirection: 'column', gap: 12,
            transition: 'border-color .15s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = p.color + '60'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: `${p.color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MI size={22} style={{ color: p.color }}>{p.icon}</MI>
            </div>
            <div>
              <div style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                {p.name}
              </div>
              <div style={{ fontSize: '.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                {p.description}
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
              {p.tags.map((tag) => (
                <Badge key={tag} color={p.color}>{tag}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Company stats */}
      <div style={{
        marginTop: 28,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px 24px',
        display: 'flex', flexWrap: 'wrap', gap: 32,
      }}>
        {[
          { label: 'Established', value: company.established },
          { label: 'Employees', value: company.employees },
          { label: 'Plants', value: company.plants },
          { label: 'Location', value: company.location },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: '.68rem', color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
