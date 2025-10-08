import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Minimal modal-like inline editor for a task.
 */
export default function TaskModal({ task, onClose, onSave }) {
  const [local, setLocal] = useState(task);

  if (!task) return null;

  return (
    <div className="panel" style={{ position: 'fixed', right: 16, bottom: 16, maxWidth: 360 }}>
      <h3 className="section-title">Edit Task</h3>
      <div style={{ display: 'grid', gap: 8 }}>
        <input
          value={local.title}
          onChange={(e) => setLocal({ ...local, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          rows={4}
          value={local.description}
          onChange={(e) => setLocal({ ...local, description: e.target.value })}
          placeholder="Description"
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="number"
            value={local.points ?? 0}
            onChange={(e) => setLocal({ ...local, points: Number(e.target.value || 0) })}
            placeholder="Points"
            style={{ width: 120 }}
          />
          <input
            value={local.assignee || ''}
            onChange={(e) => setLocal({ ...local, assignee: e.target.value })}
            placeholder="Assignee"
          />
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn secondary" onClick={onClose}>Close</button>
          <button className="btn" onClick={() => onSave?.(local)}>Save</button>
        </div>
      </div>
    </div>
  );
}
