import React from 'react';
import { MI } from '../components/ui';
import { config } from '../config/customer';

export function Contact() {
  const { company, contact } = config;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: -.5, color: 'var(--text)', lineHeight: 1.2 }}>
          {contact.heading}
        </h1>
        <p style={{ fontSize: '.78rem', color: 'var(--text-mute)', marginTop: 4 }}>
          {contact.subheading}
        </p>
      </div>

      <div className="contact-layout">
        {/* Left: info */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>
              {company.name}
            </div>
            <div style={{ fontSize: '.74rem', color: company.accentColor, fontWeight: 600 }}>
              {company.tagline}
            </div>
          </div>

          {[
            { icon: 'mail', label: 'Email', value: contact.email },
            { icon: 'phone', label: 'Phone', value: contact.phone },
            { icon: 'location_on', label: 'Address', value: contact.address },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: `${company.accentColor}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MI size={17} style={{ color: company.accentColor }}>{row.icon}</MI>
              </div>
              <div>
                <div style={{ fontSize: '.65rem', color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: .5 }}>
                  {row.label}
                </div>
                <div style={{ fontSize: '.78rem', color: 'var(--text-dim)', marginTop: 2, lineHeight: 1.4 }}>
                  {row.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: CTA card */}
        <div style={{
          background: `${company.accentColor}10`,
          border: `1px solid ${company.accentColor}30`,
          borderRadius: 'var(--radius)',
          padding: '28px 24px',
          display: 'flex', flexDirection: 'column', gap: 16,
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: company.accentGradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MI size={24} style={{ color: '#fff' }}>handshake</MI>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>
            Ready to see {company.shortName} in action?
          </div>
          <div style={{ fontSize: '.75rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>
            Our team will walk you through a personalised demo and answer any questions about our products and capabilities.
          </div>
          <button style={{
            marginTop: 8,
            padding: '10px 20px',
            background: company.accentGradient,
            color: '#fff', border: 'none', borderRadius: 8,
            fontSize: '.8rem', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <MI size={16}>send</MI>
            {contact.ctaLabel}
          </button>

          <div style={{
            marginTop: 8,
            padding: '12px 14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: '.72rem', color: 'var(--text-mute)',
            display: 'flex', alignItems: 'center', gap: 6,
            width: '100%',
          }}>
            <MI size={14} style={{ color: '#059669' }}>info</MI>
            This is a demo site. Contact details shown are for illustrative purposes.
          </div>
        </div>
      </div>
    </div>
  );
}
