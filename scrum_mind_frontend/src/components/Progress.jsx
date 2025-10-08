import React from 'react';
import { useSelector } from 'react-redux';

/**
 * PUBLIC_INTERFACE
 * Displays simple progress metrics.
 */
export default function Progress() {
  const tasks = useSelector((s) => s.tasks);
  const all = tasks.allIds.map((id) => tasks.byId[id]);
  const done = all.filter((t) => t.status === 'done').length;
  const total = all.length || 1;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="panel">
      <h3 className="section-title">Progress</h3>
      <div>Completed: {done}/{total} ({pct}%)</div>
      <div style={{ marginTop: 8, height: 10, background: '#E5E7EB', borderRadius: 6 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--success)', borderRadius: 6 }} />
      </div>
    </div>
  );
}
