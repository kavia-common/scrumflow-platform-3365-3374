import { createSlice, nanoid } from '@reduxjs/toolkit';

const columns = ['backlog', 'todo', 'in_progress', 'review', 'done'];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    byId: {},
    allIds: [],
  },
  reducers: {
    // PUBLIC_INTERFACE
    createTask: {
      reducer(state, action) {
        const t = action.payload;
        state.byId[t.id] = t;
        state.allIds.push(t.id);
      },
      prepare(data) {
        const defaults = {
          title: 'Untitled Task',
          description: '',
          status: 'backlog',
          assignee: null,
          points: 0,
          sprintId: null,
        };
        return { payload: { id: nanoid(), ...defaults, ...data } };
      },
    },
    // PUBLIC_INTERFACE
    moveTask(state, action) {
      const { id, status } = action.payload;
      if (!columns.includes(status)) return;
      if (state.byId[id]) state.byId[id].status = status;
    },
    // PUBLIC_INTERFACE
    updateTask(state, action) {
      const { id, changes } = action.payload;
      if (state.byId[id]) Object.assign(state.byId[id], changes);
    },
    // PUBLIC_INTERFACE
    deleteTask(state, action) {
      const id = action.payload;
      if (state.byId[id]) {
        delete state.byId[id];
        state.allIds = state.allIds.filter((x) => x !== id);
      }
    },
  },
});

export const { createTask, moveTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
