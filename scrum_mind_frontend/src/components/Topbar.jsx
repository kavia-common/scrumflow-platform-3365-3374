import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Topbar shows branding and theme toggle.
 */
export default function Topbar({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span aria-hidden>🏷️</span>
        <span>Scrum Mind</span>
      </div>
      <div>
        <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
