import { createAsyncThunk } from '@reduxjs/toolkit';
import { Services } from '../../api/services';

/**
 * PUBLIC_INTERFACE
 * Load boards from backend.
 */
export const fetchBoards = createAsyncThunk('boards/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const boards = await Services.listBoards();
    return boards;
  } catch (e) {
    return rejectWithValue(e.message || 'Failed to load boards');
  }
});
