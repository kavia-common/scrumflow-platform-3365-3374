import React, { useEffect, useState } from 'react';
import Button from '../components/Common/Button.jsx';
import Modal from '../components/Common/Modal.jsx';
import { sprintsApi } from '../services/api.js';

// PUBLIC_INTERFACE
export default function Sprints() {
  /** Manage sprints: list, create, and update status. */
  const [sprints, setSprints] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const load = async () => {
    const data = await sprintsApi.list();
    if (Array.isArray(data) && data.length) setSprints(data);
    else setSprints([]);
  };

  useEffect(() => { load(); }, []);

  const createSprint = async () => {
    const payload = { name, status: 'planned' };
    const res = await sprintsApi.create(payload);
    setSprints(prev => [...prev, { id: res.id || String(prev.length + 1), ...payload }]);
    setOpen(false);
    setName('');
  };

  const changeStatus = async (s, status) => {
    await sprintsApi.update(s.id, { status });
    setSprints(prev => prev.map(i => i.id === s.id ? { ...i, status } : i));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div className="section-title">Sprints</div>
        <Button onClick={() => setOpen(true)}>New Sprint</Button>
      </div>
      {sprints.length === 0 ? (
        <div className="empty">No sprints yet. Create one to start planning.</div>
      ) : (
        <div className="card" style={{ padding: 12 }}>
          {sprints.map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, borderBottom: '1px dashed rgba(17,24,39,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontWeight: 800 }}>{s.name}</div>
                <span className="badge">{s.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="ghost" onClick={() => changeStatus(s, 'planned')}>Planned</Button>
                <Button variant="ghost" onClick={() => changeStatus(s, 'active')}>Active</Button>
                <Button variant="ghost" onClick={() => changeStatus(s, 'completed')}>Completed</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} title="Create Sprint" onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={createSprint} disabled={!name.trim()}>Create</Button>
          </>
        }>
        <div className="form">
          <div className="row">
            <label htmlFor="name">Name</label>
            <input id="name" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Sprint 1" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
