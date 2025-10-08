import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/boards';
import sprintsReducer from './slices/sprints';
import tasksReducer from './slices/tasks';
import teamsReducer from './slices/teams';

/**
 * PUBLIC_INTERFACE
 * Creates the global Redux store for the Scrum Mind app.
 */
export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    sprints: sprintsReducer,
    tasks: tasksReducer,
    teams: teamsReducer,
  },
  // default middleware is sufficient here
});

export default store;
