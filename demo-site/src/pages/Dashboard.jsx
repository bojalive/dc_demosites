import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KpiCard, HealthRing, SectionLabel } from '../components/ui';
import { config } from '../config/customer';

export function Dashboard() {
  const { company, dashboard } = config;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: -.5, color: 'var(--text)', lineHeight: 1.2 }}>
          {dashboard.title}
        </h1>
        <p style={{ fontSize: '.78rem', color: 'var(--text-mute)', marginTop: 4 }}>
          {dashboard.subtitle}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {dashboard.kpis.map((kpi, i) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>

      {/* Chart */}
      <SectionLabel>Production Trend</SectionLabel>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: '20px 16px',
        marginBottom: 24,
      }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dashboard.chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-mute)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-mute)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: 'var(--text)', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-dim)' }} />
            <Bar dataKey="units" name="Units Produced" fill={company.accentColor} radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" name="Target" fill="var(--surface2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Module Health */}
      <SectionLabel>Module Health</SectionLabel>
      <div className="health-grid">
        {dashboard.modules.map((m, i) => (
          <HealthRing key={i} name={m.name} health={m.health} color={m.color} />
        ))}
      </div>
    </div>
  );
}
