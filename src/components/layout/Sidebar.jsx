import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, X, Menu } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <TrendingUp size={20} />
          </div>
          <span className="brand-name">FinanceIQ</span>
          <button className="sidebar-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-label">Navigation</p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-logo-mark">
            <TrendingUp size={14} />
            <span>FinanceIQ v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}
