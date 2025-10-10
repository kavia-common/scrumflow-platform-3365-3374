import React, { useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export default function Tasks() {
  /** Tasks list placeholder with simple filters (local state demo). */
  const [q, setQ] = useState('');
  const [items] = useState([
    { id: 't1', title: 'Create wireframes', status: 'To Do' },
    { id: 't2', title: 'Implement auth', status: 'In Progress' },
    { id: 't3', title: 'Write unit tests', status: 'Done' }
  ]);

  const filtered = useMemo(
    () => items.filter(i => i.title.toLowerCase().includes(q.toLowerCase())),
    [q, items]
  );

  return (
    <div>
      <div className="section-title">Tasks</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <input className="input" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="card" style={{ padding: 12 }}>
        {filtered.length === 0 ? (
          <div className="empty">No tasks found</div>
        ) : filtered.map(t => (
          <div key={t.id} style={{ padding: 8, borderBottom: '1px dashed rgba(17,24,39,0.12)' }}>
            <div style={{ fontWeight: 700 }}>{t.title}</div>
            <div className="badge">{t.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
