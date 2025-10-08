import { createAsyncThunk } from '@reduxjs/toolkit';
import { Services } from '../../api/services';

/**
 * PUBLIC_INTERFACE
 * Load team members from backend.
 */
export const fetchTeam = createAsyncThunk('teams/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await Services.listTeam();
    return data;
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load team');
  }
});
