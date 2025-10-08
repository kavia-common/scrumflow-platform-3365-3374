import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchSprints } from './sprints.thunks';

const sprintsSlice = createSlice({
  name: 'sprints',
  initialState: {
    activeSprintId: null,
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // PUBLIC_INTERFACE
    createSprint: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(data) {
        // UI local create fallback (not persisted)
        return { payload: { id: nanoid(), name: data.name, start_date: data.start, end_date: data.end, board_id: data.boardId ?? null } };
      },
    },
    // PUBLIC_INTERFACE
    setActiveSprint(state, action) {
      state.activeSprintId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSprints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSprints.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        if (!state.activeSprintId && state.list.length > 0) {
          state.activeSprintId = state.list[0].id;
        }
      })
      .addCase(fetchSprints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load sprints';
      });
  },
});

export const { createSprint, setActiveSprint } = sprintsSlice.actions;
export default sprintsSlice.reducer;
