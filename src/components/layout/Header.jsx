import React from 'react';
import { Menu, Sun, Moon, ChevronDown } from 'lucide-react';
import useStore from '../../store/useStore';
import './Header.css';

export default function Header({ onMenuToggle }) {
  const { role, setRole, darkMode, toggleDarkMode } = useStore();

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div className="header-breadcrumb">
          <span>FinanceIQ</span>
        </div>
      </div>

      <div className="header-right">
        {/* Role Switcher */}
        <div className="role-switcher">
          <span className={`role-dot ${role}`} />
          <select
            id="role-select"
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <ChevronDown size={14} className="role-chevron" />
        </div>

        {role === 'viewer' && (
          <div className="viewer-badge animate-fade">
            Viewer Mode
          </div>
        )}

        {/* Dark Mode Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Avatar */}
        <div className="user-avatar" title={role === 'admin' ? 'Admin User' : 'Viewer User'}>
          {role === 'admin' ? 'A' : 'V'}
        </div>
      </div>
    </header>
  );
}
