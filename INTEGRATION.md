# Scrum Mind Integration Guide

Containers
- Frontend: scrumflow-platform-3365-3374/scrum_mind_frontend (port 3000)
- Backend: scrumflow-platform-3365-3375/backend (port 3001)

Environment
- Backend (.env):
  - DATABASE_URL=sqlite:///./scrum_mind.db
  - SEED=true
- Frontend (.env):
  - REACT_APP_API_BASE_URL=http://localhost:3001

Start order
1) Backend
   - cd scrumflow-platform-3365-3375/backend
   - pip install -r requirements.txt
   - uvicorn src.api.main:app --reload --host 0.0.0.0 --port 3001
2) Frontend
   - cd scrumflow-platform-3365-3374/scrum_mind_frontend
   - npm install
   - npm start  (http://localhost:3000)

Smoke-test checklist
- Boards: Dashboard loads boards via GET /boards. One is auto-selected.
- Sprints: GET /sprints?board_id=<currentBoard>.
- Tasks: GET /tasks?board_id=<currentBoard> populate Kanban.
- Create task: "+ Quick Add Task" -> POST /tasks; item appears in "To Do".
- Update task: edit via modal -> PUT /tasks/{id}.
- Drag/move: drag cards between columns -> POST /tasks/{id}/move.
  - UI "review" column persists as backend "in_progress".
- Team: Team page lists GET /team.
- Progress: Progress page uses GET /progress/summary?board_id=<id>.
