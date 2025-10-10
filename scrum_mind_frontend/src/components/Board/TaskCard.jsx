import React from 'react';

// PUBLIC_INTERFACE
export default function TaskCard({ task }) {
  /** Compact card for a task. */
  if (!task) return null;
  return (
    <div className="task">
      <div className="task-title">{task.title}</div>
      <div className="task-meta">
        <span className="badge">{task.status}</span>
        <span>{task.assignee || 'Unassigned'}</span>
      </div>
    </div>
  );
}
