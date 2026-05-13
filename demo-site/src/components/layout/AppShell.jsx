import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header, HamburgerStyle } from './Header';

export function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <HamburgerStyle />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="main-content">
        <Header onMenuClick={() => setMobileOpen(true)} />
        {children}
      </main>
    </>
  );
}
