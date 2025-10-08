import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchTasks, saveTask, createRemoteTask, moveRemoteTask } from './tasks.thunks';

// Align statuses with backend enums but keep 'review' column in UI grouping;
// map 'review' to 'in_progress' on persistence if needed. For now, allowed
// statuses are backend's plus UI 'backlog' for initial locally created tasks.
const columns = ['backlog', 'todo', 'in_progress', 'review', 'done', 'blocked'];

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
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
          boardId: null,
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
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.byId = {};
        state.allIds = [];
        action.payload.forEach((t) => {
          state.byId[t.id] = t;
          state.allIds.push(t.id);
        });
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load tasks';
      })
      // saveTask
      .addCase(saveTask.pending, (state) => {
        state.error = null;
      })
      .addCase(saveTask.fulfilled, (state, action) => {
        const t = action.payload;
        if (!state.byId[t.id]) state.allIds.push(t.id);
        state.byId[t.id] = t;
      })
      .addCase(saveTask.rejected, (state, action) => {
        state.error = action.payload || 'Failed to save task';
      })
      // createRemoteTask
      .addCase(createRemoteTask.pending, (state) => {
        state.error = null;
      })
      .addCase(createRemoteTask.fulfilled, (state, action) => {
        const t = action.payload;
        state.byId[t.id] = t;
        if (!state.allIds.includes(t.id)) state.allIds.push(t.id);
      })
      .addCase(createRemoteTask.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create task';
      })
      // moveRemoteTask
      .addCase(moveRemoteTask.pending, (state) => {
        state.error = null;
      })
      .addCase(moveRemoteTask.fulfilled, (state, action) => {
        const t = action.payload;
        if (!state.byId[t.id]) state.allIds.push(t.id);
        state.byId[t.id] = t;
      })
      .addCase(moveRemoteTask.rejected, (state, action) => {
        state.error = action.payload || 'Failed to move task';
      });
  },
});

export const { createTask, moveTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
