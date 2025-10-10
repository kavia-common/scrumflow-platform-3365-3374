import React from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children, footer }) {
  /** Simple modal overlay for forms. */
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
      display: 'grid', placeItems: 'center', zIndex: 1000
    }}>
      <div className="card" style={{ width: 520, maxWidth: '94vw', padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div className="section-title" style={{ margin: 0 }}>{title}</div>
          <button className="btn ghost" onClick={onClose} aria-label="Close">✖</button>
        </div>
        <div style={{ padding: '6px 0 12px' }}>{children}</div>
        {footer ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div> : null}
      </div>
    </div>
  );
}
