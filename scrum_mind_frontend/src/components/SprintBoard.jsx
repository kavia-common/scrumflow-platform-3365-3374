import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

/**
 * PUBLIC_INTERFACE
 * Shows tasks for the active sprint.
 */
export default function SprintBoard() {
  const { byId, allIds } = useSelector((s) => s.tasks);
  const activeSprintId = useSelector((s) => s.sprints.activeSprintId);

  const items = allIds
    .map((id) => byId[id])
    .filter((t) => t.sprintId === activeSprintId);

  return (
    <div className="panel">
      <h3 className="section-title">Active Sprint</h3>
      {!activeSprintId && <div>No active sprint selected.</div>}
      {activeSprintId && items.length === 0 && <div>No tasks in active sprint.</div>}
      {items.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  );
}
