import React from 'react';
import { useDispatch } from 'react-redux';
import KanbanBoard from '../components/KanbanBoard';
import { createTask } from '../state/slices/tasks';

/**
 * PUBLIC_INTERFACE
 * Dashboard landing page with Kanban board and quick add task.
 */
export default function Dashboard() {
  const dispatch = useDispatch();

  const quickAdd = () => {
    dispatch(createTask({ title: 'New Task', description: 'Describe task...' }));
  };

  return (
    <div className="page">
      <div className="panel" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Dashboard</h2>
        <button className="btn" onClick={quickAdd}>+ Quick Add Task</button>
      </div>
      <KanbanBoard />
    </div>
  );
}
