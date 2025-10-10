import axios from 'axios';

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

// Basic helpers for common endpoints used in pages.
// PUBLIC_INTERFACE
export const boardsApi = {
  /** Get boards list */
  async list() {
    const res = await api.get('/boards').catch(() => ({ data: [] }));
    return res.data || [];
  },
  /** Create a new board */
  async create(payload) {
    const res = await api.post('/boards', payload).catch(() => ({ data: payload }));
    return res.data;
  },
  /** Get board by id */
  async get(id) {
    const res = await api.get(`/boards/${id}`).catch(() => ({ data: null }));
    return res.data;
  },
  /** Update task status simple endpoint */
  async updateTaskStatus(boardId, taskId, status) {
    const res = await api.patch(`/boards/${boardId}/tasks/${taskId}`, { status }).catch(() => ({ data: { id: taskId, status } }));
    return res.data;
  }
};

// PUBLIC_INTERFACE
export const sprintsApi = {
  async list() {
    const res = await api.get('/sprints').catch(() => ({ data: [] }));
    return res.data || [];
  },
  async create(payload) {
    const res = await api.post('/sprints', payload).catch(() => ({ data: payload }));
    return res.data;
  },
  async update(id, payload) {
    const res = await api.patch(`/sprints/${id}`, payload).catch(() => ({ data: { ...payload, id } }));
    return res.data;
  }
};

// PUBLIC_INTERFACE
export const teamsApi = {
  async list() {
    const res = await api.get('/teams').catch(() => ({ data: [] }));
    return res.data || [];
  },
  async invite(payload) {
    // Simulated invite
    return { success: true, ...payload };
  }
};
