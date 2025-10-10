import React, { useEffect, useState } from 'react';
import Button from '../components/Common/Button.jsx';
import Modal from '../components/Common/Modal.jsx';
import { teamsApi } from '../services/api.js';

// PUBLIC_INTERFACE
export default function Teams() {
  /** View team members and invite new ones (simulated). */
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await teamsApi.list();
      setMembers(Array.isArray(data) ? data : [
        { id: 'u1', name: 'Alex Rivera', role: 'Product Owner' },
        { id: 'u2', name: 'Jamie Chen', role: 'Scrum Master' },
        { id: 'u3', name: 'Taylor Singh', role: 'Developer' }
      ]);
    };
    load();
  }, []);

  const invite = async () => {
    setMsg('');
    await teamsApi.invite({ email });
    setMsg(`Invitation sent to ${email}`);
    setOpen(false);
    setEmail('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div className="section-title">Teams</div>
        <Button onClick={() => setOpen(true)}>Invite</Button>
      </div>

      {msg ? <div className="empty">{msg}</div> : null}

      <div className="card" style={{ padding: 12 }}>
        {members.length === 0 ? (
          <div className="empty">No members found</div>
        ) : members.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, borderBottom: '1px dashed rgba(17,24,39,0.12)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
                border: '2px solid rgba(17,24,39,0.12)'
              }}/>
              <div>
                <div style={{ fontWeight: 700 }}>{m.name}</div>
                <div style={{ color: 'var(--color-muted)' }}>{m.role}</div>
              </div>
            </div>
            <span className="badge">Member</span>
          </div>
        ))}
      </div>

      <Modal open={open} title="Invite Member" onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={invite} disabled={!email.trim()}>Send Invite</Button>
          </>
        }>
        <div className="form">
          <div className="row">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="teammate@company.com" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
