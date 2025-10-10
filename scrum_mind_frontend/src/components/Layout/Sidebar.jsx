import React from 'react';
import { NavLink } from 'react-router-dom';

const navs = [
  { to: '/boards', label: 'Boards', icon: '📋' },
  { to: '/sprints', label: 'Sprints', icon: '🏁' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
  { to: '/teams', label: 'Teams', icon: '👥' },
  { to: '/settings', label: 'Settings', icon: '⚙️' }
];

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Classic sidebar navigation */
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-badge">S</div>
        Scrum Mind
      </div>
      <nav>
        {navs.map(n => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span aria-hidden>{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
