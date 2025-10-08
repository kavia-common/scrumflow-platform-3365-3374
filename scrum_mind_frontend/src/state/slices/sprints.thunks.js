import { createAsyncThunk } from '@reduxjs/toolkit';
import { Services } from '../../api/services';

/**
 * PUBLIC_INTERFACE
 * Load sprints from backend, optionally by boardId.
 */
export const fetchSprints = createAsyncThunk('sprints/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const data = await Services.listSprints(params);
    return data;
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load sprints');
  }
});
