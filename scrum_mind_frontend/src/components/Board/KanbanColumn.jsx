import React from 'react';

// PUBLIC_INTERFACE
export default function KanbanColumn({ title, tasks = [], onChangeStatus }) {
  /** A single Kanban column listing tasks and enabling simple status change. */
  return (
    <div className="column">
      <div className="column-header">
        <div style={{ fontWeight: 800 }}>{title}</div>
        <div className="badge">{tasks.length}</div>
      </div>
      <div>
        {tasks.length === 0 ? (
          <div className="empty">No tasks</div>
        ) : (
          tasks.map(t => (
            <div key={t.id} className="task">
              <div className="task-title">{t.title}</div>
              <div className="task-meta">
                <span className="badge">{t.status}</span>
                <button className="btn ghost" onClick={() => onChangeStatus?.(t, 'To Do')}>To Do</button>
                <button className="btn ghost" onClick={() => onChangeStatus?.(t, 'In Progress')}>In Progress</button>
                <button className="btn ghost" onClick={() => onChangeStatus?.(t, 'Review')}>Review</button>
                <button className="btn ghost" onClick={() => onChangeStatus?.(t, 'Done')}>Done</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
