import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { moveTask, updateTask } from '../state/slices/tasks';
import { moveRemoteTask, saveTask } from '../state/slices/tasks.thunks';

const COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

/**
 * PUBLIC_INTERFACE
 * Kanban board that shows tasks grouped by status and supports simple moves.
 */
export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { byId, allIds } = useSelector((s) => s.tasks);
  const [selected, setSelected] = useState(null);

  const grouped = COLUMNS.reduce((acc, c) => ({ ...acc, [c.id]: [] }), {});
  allIds.forEach((id) => {
    const t = byId[id];
    if (grouped[t.status]) grouped[t.status].push(t);
  });

  const handleDrop = (taskId, status) => {
    // optimistic update
    dispatch(moveTask({ id: taskId, status }));
    // persist to backend (map 'review' to 'in_progress' for backend if needed)
    const persistedStatus = status === 'review' ? 'in_progress' : status;
    dispatch(moveRemoteTask({ id: taskId, status: persistedStatus }));
  };

  return (
    <>
      <div className="kanban">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const tid = e.dataTransfer.getData('text/plain');
              handleDrop(tid, col.id);
            }}
          >
            <div className="column-title">{col.title}</div>
            {grouped[col.id].map((t) => (
              <div
                key={t.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', t.id)}
              >
                <TaskCard task={t} onClick={() => setSelected(t)} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <TaskModal
        task={selected}
        onClose={() => setSelected(null)}
        onSave={(updated) => {
          // keep local state aligned
          dispatch(updateTask({ id: updated.id, changes: updated }));
          // persist mapped fields
          dispatch(saveTask({ id: updated.id, changes: {
            title: updated.title,
            description: updated.description,
            status: updated.status === 'review' ? 'in_progress' : updated.status,
            points: updated.points,
            assigneeId: updated.assigneeId ?? null,
            sprintId: updated.sprintId ?? null,
            boardId: updated.boardId ?? null,
          }}));
          setSelected(null);
        }}
      />
    </>
  );
}
