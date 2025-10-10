import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import KanbanColumn from '../components/Board/KanbanColumn.jsx';
import { boardsApi } from '../services/api.js';

// PUBLIC_INTERFACE
export default function BoardDetail() {
  /** Displays selected board tasks in a Kanban layout with simple status change. */
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await boardsApi.get(boardId);
      if (data && data.title) {
        setBoard(data);
        setTasks(data.tasks || []);
      } else {
        // Fallback demo content when backend absent
        setBoard({ id: boardId, title: `Board #${boardId}` });
        setTasks([
          { id: '1', title: 'Set up repo', status: 'To Do' },
          { id: '2', title: 'Design login', status: 'In Progress' },
          { id: '3', title: 'Sprint planning', status: 'Review' },
          { id: '4', title: 'Deploy dev', status: 'Done' }
        ]);
      }
    };
    load();
  }, [boardId]);

  const grouped = useMemo(() => {
    const g = { 'To Do': [], 'In Progress': [], 'Review': [], 'Done': [] };
    tasks.forEach(t => { if (g[t.status]) g[t.status].push(t); });
    return g;
  }, [tasks]);

  const changeStatus = async (task, newStatus) => {
    if (task.status === newStatus) return;
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    try {
      await boardsApi.updateTaskStatus(boardId, task.id, newStatus);
    } catch {
      // revert in case of error
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: task.status } : t));
    }
  };

  return (
    <div>
      <div className="section-title">{board?.title || 'Board'}</div>
      <div className="kanban">
        <KanbanColumn title="To Do" tasks={grouped['To Do']} onChangeStatus={changeStatus} />
        <KanbanColumn title="In Progress" tasks={grouped['In Progress']} onChangeStatus={changeStatus} />
        <KanbanColumn title="Review" tasks={grouped['Review']} onChangeStatus={changeStatus} />
        <KanbanColumn title="Done" tasks={grouped['Done']} onChangeStatus={changeStatus} />
      </div>
    </div>
  );
}
