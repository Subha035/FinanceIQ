import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useStore from '../../store/useStore';
import './Layout.css';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role, darkMode } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-role', role);
  }, [darkMode, role]);

  return (
    <div 
      data-theme={darkMode ? 'dark' : 'light'} 
      data-role={role}
      className="layout-root"
    >
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="layout-main">
        <Header onMenuToggle={() => setMobileOpen(o => !o)} />
        <main className="layout-content page-enter">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
