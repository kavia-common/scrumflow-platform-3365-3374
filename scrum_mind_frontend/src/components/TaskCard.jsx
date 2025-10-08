import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Displays a concise view of a task.
 */
export default function TaskCard({ task, onClick }) {
  return (
    <div className="task-card" role="button" tabIndex={0} onClick={() => onClick?.(task)}>
      <div style={{ fontWeight: 600 }}>{task.title}</div>
      <div style={{ fontSize: 12, opacity: 0.8 }}>{task.description || 'No description'}</div>
      <div style={{ marginTop: 6, fontSize: 12 }}>
        {task.points ?? 0} pts {task.assignee ? `• ${task.assignee}` : ''}
      </div>
    </div>
  );
}
