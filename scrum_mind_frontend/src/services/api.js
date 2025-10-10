import axios from 'axios';

// Resolve API base URL from env with sensible local default
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Create axios instance
export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// PUBLIC_INTERFACE
export const authApi = {
  /** POST /api/auth/register */
  async register(payload) {
    const res = await api.post('/api/auth/register', payload);
    return res.data;
  },
  /** POST /api/auth/login (x-www-form-urlencoded) */
  async login({ email, password }) {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    // FastAPI OAuth2PasswordRequestForm expects x-www-form-urlencoded
    const res = await api.post('/api/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return res.data;
  },
  /** GET /api/auth/me */
  async me() {
    const res = await api.get('/api/auth/me');
    return res.data;
  },
};

// Basic helpers pointing to backend routes
/* eslint-disable no-useless-escape */
// PUBLIC_INTERFACE
export const boardsApi = {
  /** List boards by team (requires teamId) -> GET /api/boards/team/{team_id} */
  async listByTeam(teamId, { limit = 100, offset = 0 } = {}) {
    const res = await api.get(`/api/boards/team/${teamId}`, { params: { limit, offset } });
    return res.data || [];
  },
  /** List all boards (fallback when team is not specified) -> GET /api/boards */
  async list({ limit = 100, offset = 0 } = {}) {
    const res = await api.get('/api/boards', { params: { limit, offset } });
    return res.data || [];
  },
  /** Create a new board -> POST /api/boards */
  async create(payload) {
    const res = await api.post('/api/boards', payload);
    return res.data;
  },
  /** Get board by id -> GET /api/boards/{board_id} */
  async get(boardId) {
    const res = await api.get(`/api/boards/${boardId}`);
    return res.data;
  },
  /** Update board task status -> PATCH /api/boards/{board_id}/tasks/{task_id}/status */
  async updateTaskStatus(boardId, taskId, status) {
    const res = await api.patch(`/api/boards/${boardId}/tasks/${taskId}/status`, { status });
    return res.data;
  },
};

/* eslint-disable no-useless-escape */
// PUBLIC_INTERFACE
export const sprintsApi = {
  /** List sprints for a board -> GET /api/sprints/board/{board_id} */
  async listByBoard(boardId, { limit = 100, offset = 0 } = {}) {
    const res = await api.get(`/api/sprints/board/${boardId}`, { params: { limit, offset } });
    return res.data || [];
  },
  /** List sprints (fallback) -> GET /api/sprints */
  async list({ limit = 100, offset = 0 } = {}) {
    const res = await api.get('/api/sprints', { params: { limit, offset } });
    return res.data || [];
  },
  /** Create sprint -> POST /api/sprints */
  async create(payload) {
    const res = await api.post('/api/sprints', payload);
    return res.data;
  },
  /** Get sprint by id -> GET /api/sprints/{sprint_id} */
  async get(sprintId) {
    const res = await api.get(`/api/sprints/${sprintId}`);
    return res.data;
  },
  /** Update sprint -> PATCH /api/sprints/{sprint_id} */
  async update(sprintId, payload) {
    const res = await api.patch(`/api/sprints/${sprintId}`, payload);
    return res.data;
  },
};

// PUBLIC_INTERFACE
export const tasksApi = {
  /** List tasks for a board -> GET /api/tasks/board/{board_id} */
  async listByBoard(boardId, { status, assigneeId, limit = 100, offset = 0 } = {}) {
    const params = {};
    if (status) params.status_filter = status;
    if (assigneeId) params.assignee_id = assigneeId;
    params.limit = limit;
    params.offset = offset;
    const res = await api.get(`/api/tasks/board/${boardId}`, { params });
    return res.data || [];
  },
  /** Create task -> POST /api/tasks */
  async create(payload) {
    const res = await api.post('/api/tasks', payload);
    return res.data;
  },
  /** Get task by id -> GET /api/tasks/{task_id} */
  async get(taskId) {
    const res = await api.get(`/api/tasks/${taskId}`);
    return res.data;
  },
  /** Update task status -> PATCH /api/tasks/{task_id}/status */
  async updateStatus(taskId, status) {
    const res = await api.patch(`/api/tasks/${taskId}/status`, { status });
    return res.data;
  },
};

/* eslint-disable no-useless-escape */
// PUBLIC_INTERFACE
export const teamsApi = {
  /** List teams -> GET /api/teams */
  async list({ limit = 100, offset = 0 } = {}) {
    const res = await api.get('/api/teams', { params: { limit, offset } });
    return res.data || [];
  },
  /** Get team by id -> GET /api/teams/{team_id} */
  async get(teamId) {
    const res = await api.get(`/api/teams/${teamId}`);
    return res.data;
  },
  /** Invite a user -> POST /api/teams/invite */
  async invite(payload) {
    const res = await api.post('/api/teams/invite', payload);
    return res.data;
  },
};
