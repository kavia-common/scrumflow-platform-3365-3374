import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

/**
 * PUBLIC_INTERFACE
 * Displays tasks in backlog status only.
 */
export default function Backlog() {
  const tasks = useSelector((s) => s.tasks);
  const items = tasks.allIds.map((id) => tasks.byId[id]).filter((t) => t.status === 'backlog');

  return (
    <div className="panel">
      <h3 className="section-title">Backlog</h3>
      {items.length === 0 && <div>No items in backlog.</div>}
      {items.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  );
}
