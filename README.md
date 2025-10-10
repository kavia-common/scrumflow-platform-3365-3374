# Scrum Mind Frontend (scrum_mind_frontend)

Lightweight React frontend for the Scrum Mind app.

Quickstart
- Prereqs: Node 18+, npm
- Install: cd scrum_mind_frontend && npm install
- Configure env (optional): create .env in scrum_mind_frontend with:
  - REACT_APP_API_BASE_URL=http://localhost:3001
    - Defaults to http://localhost:3001 if not set
- Start dev server (port 3000): npm start
- Run tests (CI mode): CI=true npm test

Ports
- Frontend: http://localhost:3000
- Backend (dependency): http://localhost:3001

Environment variables
- REACT_APP_API_BASE_URL: Base URL of the backend API (e.g., http://localhost:3001). If omitted, the client defaults to http://localhost:3001.

Backend dependency
- Ensure the backend is running (see scrumflow-platform-3365-3375/backend/README.md). If using SEED=true on backend, sample data will be available (boards, sprints, tasks, team).

Smoke-test checklist (frontend + backend)
- Boards load:
  - Navigate to Dashboard; app fetches /boards and picks first as current board.
- Sprints fetch:
  - App fetches /sprints?board_id=<currentBoardId>.
- Tasks fetch:
  - App fetches /tasks?board_id=<currentBoardId> and displays Kanban columns (Backlog, To Do, In Progress, Review, Done).
- Create task (CRUD - Create):
  - Click "+ Quick Add Task" on Dashboard; verify new task appears in "To Do" and persisted via POST /tasks.
- Update task (CRUD - Update):
  - Click a task card to open editor; change title/description/points; Save. Verify PUT /tasks/:id success and UI updates.
- Move/drag updates:
  - Drag a task between columns. Review column maps to backend in_progress on save:
    - UI "review" -> backend "in_progress" via POST /tasks/:id/move.
  - Verify task updates in UI and persistence.
- Delete (optional):
  - Not wired in UI, but API supports DELETE /tasks/:id.
- Team list:
  - Team page fetches /team and lists members.
- Progress summary:
  - Progress page or via API /progress/summary?board_id=<id> returns totals, by-status counts, and velocity (sum of story_points for done).

Notes
- The UI shows a "Review" column for workflow visibility; backend enums do not include "review". The client persists "review" as "in_progress".
- For sprint-focused view, Sprints page shows tasks matching active sprint (auto-selected after sprints fetch).

Troubleshooting
- If boards/tasks do not appear, confirm backend is running on port 3001 and CORS allows http://localhost:3000 (preconfigured).
- Adjust REACT_APP_API_BASE_URL in .env if backend is hosted elsewhere.