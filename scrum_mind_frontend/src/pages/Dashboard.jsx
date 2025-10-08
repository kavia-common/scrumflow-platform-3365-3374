import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KanbanBoard from '../components/KanbanBoard';
import { createRemoteTask, fetchTasks } from '../state/slices/tasks.thunks';
import { fetchBoards } from '../state/slices/boards.thunks';
import { fetchSprints } from '../state/slices/sprints.thunks';

/**
 * PUBLIC_INTERFACE
 * Dashboard landing page with Kanban board and quick add task.
 */
export default function Dashboard() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.tasks);
  const currentBoardId = useSelector((s) => s.boards.currentBoardId);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  useEffect(() => {
    if (currentBoardId != null) {
      dispatch(fetchSprints({ board_id: currentBoardId }));
      dispatch(fetchTasks({ board_id: currentBoardId }));
    }
  }, [dispatch, currentBoardId]);

  const quickAdd = () => {
    if (!currentBoardId) return;
    dispatch(
      createRemoteTask({
        title: 'New Task',
        description: 'Describe task...',
        boardId: currentBoardId,
        status: 'todo',
      })
    );
  };

  return (
    <div className="page">
      <div className="panel" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Dashboard</h2>
        <button className="btn" onClick={quickAdd} disabled={!currentBoardId || loading}>
          + Quick Add Task
        </button>
      </div>
      {error && <div className="panel" style={{ marginBottom: 12, borderColor: 'var(--error)', color: 'var(--error)' }}>Error: {error}</div>}
      {loading && <div className="panel" style={{ marginBottom: 12 }}>Loading tasks...</div>}
      <KanbanBoard />
    </div>
  );
}
