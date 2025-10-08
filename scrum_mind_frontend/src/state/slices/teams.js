import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchTeam } from './teams.thunks';

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    members: [], // {id, name, role}
    loading: false,
    error: null,
  },
  reducers: {
    // PUBLIC_INTERFACE
    addMember: {
      reducer(state, action) {
        state.members.push(action.payload);
      },
      prepare(data) {
        return { payload: { id: nanoid(), role: 'Member', ...data } };
      },
    },
    // PUBLIC_INTERFACE
    removeMember(state, action) {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
    // PUBLIC_INTERFACE
    updateMember(state, action) {
      const { id, changes } = action.payload;
      const idx = state.members.findIndex((m) => m.id === id);
      if (idx >= 0) state.members[idx] = { ...state.members[idx], ...changes };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load team';
      });
  },
});

export const { addMember, removeMember, updateMember } = teamsSlice.actions;
export default teamsSlice.reducer;
