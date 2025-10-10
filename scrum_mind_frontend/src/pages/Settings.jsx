import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

// PUBLIC_INTERFACE
export default function Settings() {
  /** Basic settings overview showing user and configuration. */
  const { user } = useAuth();

  return (
    <div>
      <div className="section-title">Settings</div>
      <div className="card" style={{ padding: 14, display: 'grid', gap: 10 }}>
        <div><strong>User:</strong> {user?.email}</div>
        <div><strong>API Base URL:</strong> {process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}</div>
        <div style={{ color: 'var(--color-muted)' }}>
          Configure environment variables in .env file for deployments.
        </div>
      </div>
    </div>
  );
}
