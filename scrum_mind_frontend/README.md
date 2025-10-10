# Scrum Mind Frontend

Minimal React app styled with the Ocean Professional theme.

Quickstart
- Prereqs: Node 18+, npm
- Install: npm install
- Env (optional): create .env with REACT_APP_API_BASE_URL=http://localhost:3001
  - If omitted, defaults to http://localhost:3001
- Start (dev): npm start (runs on http://localhost:3000)
- Test (CI mode): CI=true npm test
- Build: npm run build

Environment
- REACT_APP_API_BASE_URL: URL of backend API (CORS allows http://localhost:3000 by default on backend).

Backend
- See ../../scrumflow-platform-3365-3375/backend/README.md for backend setup.
- You can enable SEED=true on backend to auto-generate sample data.

Smoke-test checklist
- Boards load (GET /boards), first board auto-selected.
- Sprints fetch (GET /sprints?board_id=...).
- Tasks fetch (GET /tasks?board_id=...); Kanban shows Backlog, To Do, In Progress, Review, Done.
- CRUD:
  - Create: "+ Quick Add Task" (POST /tasks).
  - Update: edit via task modal (PUT /tasks/:id).
- Drag/move:
  - Drag between columns; "review" is persisted as in_progress (POST /tasks/:id/move).
- Team list: Team page (GET /team).
- Progress summary: Progress page calls /progress/summary.

Notes
- The UI shows a "Review" column for workflow granularity; persisted as in_progress to match backend enums.
