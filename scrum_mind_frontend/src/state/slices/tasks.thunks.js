import { createAsyncThunk } from '@reduxjs/toolkit';
import { Services } from '../../api/services';

/**
 * PUBLIC_INTERFACE
 * Load tasks from backend (optionally filter by boardId or sprintId).
 */
export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const tasks = await Services.listTasks(params);
    return tasks;
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load tasks');
  }
});

/**
 * PUBLIC_INTERFACE
 * Persist task updates to backend.
 */
export const saveTask = createAsyncThunk('tasks/saveTask', async ({ id, changes }, { rejectWithValue }) => {
  try {
    const t = await Services.updateTask(id, changes);
    return t;
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to save task');
  }
});

/**
 * PUBLIC_INTERFACE
 * Create task via backend.
 */
export const createRemoteTask = createAsyncThunk('tasks/createRemoteTask', async (payload, { rejectWithValue }) => {
  try {
    const t = await Services.createTask(payload);
    return t;
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to create task');
  }
});

/**
 * PUBLIC_INTERFACE
 * Move task via backend convenience endpoint.
 */
export const moveRemoteTask = createAsyncThunk('tasks/moveRemoteTask', async ({ id, status, sprintId, boardId }, { rejectWithValue }) => {
  try {
    const t = await Services.moveTask(id, { status, sprintId, boardId });
    return t;
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to move task');
  }
});
