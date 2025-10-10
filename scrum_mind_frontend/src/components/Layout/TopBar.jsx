import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

// PUBLIC_INTERFACE
export default function TopBar() {
  /** Top bar with quick actions and user menu. */
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="section-title">Dashboard</div>
        <span className="badge">Ocean Professional</span>
      </div>
      <div className="toolbar">
        <button className="btn ghost" title="Notifications">🔔</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
              border: '2px solid rgba(17,24,39,0.12)'
            }}
            title={user?.email || 'user'}
          />
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
