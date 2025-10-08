import { createSlice, nanoid } from '@reduxjs/toolkit';

const sprintsSlice = createSlice({
  name: 'sprints',
  initialState: {
    activeSprintId: null,
    list: [],
  },
  reducers: {
    // PUBLIC_INTERFACE
    createSprint: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(data) {
        return { payload: { id: nanoid(), name: data.name, start: data.start, end: data.end } };
      },
    },
    // PUBLIC_INTERFACE
    setActiveSprint(state, action) {
      state.activeSprintId = action.payload;
    },
  },
});

export const { createSprint, setActiveSprint } = sprintsSlice.actions;
export default sprintsSlice.reducer;
