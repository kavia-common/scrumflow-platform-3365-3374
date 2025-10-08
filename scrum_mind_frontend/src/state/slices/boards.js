import { createSlice } from '@reduxjs/toolkit';

/**
 * Lightweight boards slice to store current board and available boards.
 */
const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    currentBoardId: 'default',
    list: [{ id: 'default', name: 'Main Board' }],
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
});

export const { setCurrentBoard, addBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
