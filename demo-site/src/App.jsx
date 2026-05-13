import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Features } from './pages/Features';
import { Contact } from './pages/Contact';
import { config } from './config/customer';
import './index.css';

export default function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', config.company.accentColor);
    document.documentElement.style.setProperty('--accent10', config.company.accentColor + '1a');
    document.documentElement.style.setProperty('--accent-g', config.company.accentGradient);
    document.title = config.company.name + ' — Demo';
  }, []);

  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}
