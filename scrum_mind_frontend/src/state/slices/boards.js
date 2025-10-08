import { createSlice } from '@reduxjs/toolkit';
import { fetchBoards } from './boards.thunks';

/**
 * Lightweight boards slice to store current board and available boards.
 */
const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    currentBoardId: null,
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // PUBLIC_INTERFACE
    setCurrentBoard(state, action) {
      state.currentBoardId = action.payload;
    },
    // PUBLIC_INTERFACE
    addBoard(state, action) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        if (!state.currentBoardId && state.list.length > 0) {
          state.currentBoardId = state.list[0].id;
        }
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load boards';
      });
  },
});

export const { setCurrentBoard, addBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
