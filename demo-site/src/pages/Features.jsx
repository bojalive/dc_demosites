import React from 'react';
import { MI, SectionLabel } from '../components/ui';
import { config } from '../config/customer';

export function Features() {
  const { company, features } = config;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: -.5, color: 'var(--text)', lineHeight: 1.2 }}>
          Why Choose Us
        </h1>
        <p style={{ fontSize: '.78rem', color: 'var(--text-mute)', marginTop: 4 }}>
          What sets {company.shortName} apart
        </p>
      </div>

      <SectionLabel>Key Capabilities</SectionLabel>
      <div className="feature-grid">
        {features.map((f, i) => (
          <div key={i} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            display: 'flex', gap: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 9,
              background: `${company.accentColor}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <MI size={20} style={{ color: company.accentColor }}>{f.icon}</MI>
            </div>
            <div>
              <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                {f.title}
              </div>
              <div style={{ fontSize: '.74rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>
                {f.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tagline banner */}
      <div style={{
        marginTop: 28,
        background: `${company.accentColor}10`,
        border: `1px solid ${company.accentColor}30`,
        borderRadius: 'var(--radius)',
        padding: '24px 28px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>
          {company.tagline}
        </div>
        <div style={{ fontSize: '.78rem', color: 'var(--text-dim)' }}>
          {company.name} · Est. {company.established} · {company.location}
        </div>
      </div>
    </div>
  );
}
