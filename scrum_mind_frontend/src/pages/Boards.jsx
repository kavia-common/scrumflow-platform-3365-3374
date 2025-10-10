import React, { useEffect, useState } from 'react';
import Button from '../components/Common/Button.jsx';
import Modal from '../components/Common/Modal.jsx';
import { boardsApi } from '../services/api.js';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Boards() {
  /** Lists all boards and allows creating a new board. */
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      const data = await boardsApi.list();
      setBoards(Array.isArray(data) ? data : []);
    } catch {
      setErr('Could not load boards.');
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async () => {
    try {
      setErr('');
      const created = await boardsApi.create({ title });
      setBoards(prev => [...prev, { id: created.id || String(prev.length + 1), title: created.title }]);
      setOpen(false);
      setTitle('');
    } catch {
      setErr('Failed to create board.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div className="section-title">Boards</div>
        <Button onClick={() => setOpen(true)}>New Board</Button>
      </div>
      {err ? <div className="empty">{err}</div> : null}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
        {boards.length === 0 ? (
          <div className="empty" style={{ gridColumn: '1/-1' }}>
            No boards yet. Create your first board.
          </div>
        ) : boards.map(b => (
          <Link key={b.id} to={`/boards/${b.id}`} className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 800 }}>{b.title}</div>
            <div style={{ color: 'var(--color-muted)' }}>View details →</div>
          </Link>
        ))}
      </div>

      <Modal open={open} title="Create Board" onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={onCreate} disabled={!title.trim()}>Create</Button>
          </>
        }>
        <div className="form">
          <div className="row">
            <label htmlFor="board-title">Title</label>
            <input id="board-title" className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Website Redesign" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
