import api from './client';

/**
 * PUBLIC_INTERFACE
 * Service layer mapping backend OpenAPI endpoints to simple functions.
 * Normalizes backend fields to the minimal frontend state shape.
 */
export const Services = {
  // Boards
  async listBoards() {
    const data = await api.get('/boards');
    return data;
  },
  async createBoard(payload) {
    return api.post('/boards', payload);
  },

  // Sprints
  async listSprints(params = {}) {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null))
    ).toString();
    const path = query ? `/sprints?${query}` : '/sprints';
    const data = await api.get(path);
    return data;
  },

  // Tasks
  async listTasks(params = {}) {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null))
    ).toString();
    const path = query ? `/tasks?${query}` : '/tasks';
    const items = await api.get(path);
    // Normalize to frontend task fields we use in UI
    // Backend fields: id, title, description, status, story_points, assignee_id, sprint_id, board_id
    return items.map((t) => ({
      id: String(t.id),
      title: t.title,
      description: t.description ?? '',
      status: t.status || 'todo',
      // map story_points -> points (UI)
      points: t.story_points ?? 0,
      // leave raw ids for joins if needed
      assigneeId: t.assignee_id ?? null,
      sprintId: t.sprint_id ?? null,
      boardId: t.board_id ?? null,
      // convenience name to show assignee id in card if no user lookup
      assignee: t.assignee_id != null ? `#${t.assignee_id}` : null,
    }));
  },

  async createTask(payload) {
    // In UI, points -> story_points, sprintId -> sprint_id, boardId -> board_id, assigneeId -> assignee_id
    const body = {
      title: payload.title,
      description: payload.description ?? null,
      status: payload.status ?? 'todo',
      story_points: payload.points ?? null,
      board_id: payload.boardId,
      sprint_id: payload.sprintId ?? null,
      assignee_id: payload.assigneeId ?? null,
      priority: payload.priority ?? 'medium',
    };
    const t = await api.post('/tasks', body);
    return {
      id: String(t.id),
      title: t.title,
      description: t.description ?? '',
      status: t.status || 'todo',
      points: t.story_points ?? 0,
      assigneeId: t.assignee_id ?? null,
      sprintId: t.sprint_id ?? null,
      boardId: t.board_id ?? null,
      assignee: t.assignee_id != null ? `#${t.assignee_id}` : null,
    };
  },

  async updateTask(id, changes) {
    const body = {};
    if ('title' in changes) body.title = changes.title;
    if ('description' in changes) body.description = changes.description ?? null;
    if ('status' in changes) body.status = changes.status;
    if ('points' in changes) body.story_points = changes.points ?? null;
    if ('assigneeId' in changes) body.assignee_id = changes.assigneeId ?? null;
    if ('sprintId' in changes) body.sprint_id = changes.sprintId ?? null;
    if ('boardId' in changes) body.board_id = changes.boardId ?? null;

    const t = await api.put(`/tasks/${id}`, body);
    return {
      id: String(t.id),
      title: t.title,
      description: t.description ?? '',
      status: t.status || 'todo',
      points: t.story_points ?? 0,
      assigneeId: t.assignee_id ?? null,
      sprintId: t.sprint_id ?? null,
      boardId: t.board_id ?? null,
      assignee: t.assignee_id != null ? `#${t.assignee_id}` : null,
    };
  },

  async moveTask(id, { status, sprintId, boardId }) {
    const body = {
      status: status ?? null,
      sprint_id: sprintId ?? null,
      board_id: boardId ?? null,
    };
    const t = await api.post(`/tasks/${id}/move`, body);
    return {
      id: String(t.id),
      title: t.title,
      description: t.description ?? '',
      status: t.status || 'todo',
      points: t.story_points ?? 0,
      assigneeId: t.assignee_id ?? null,
      sprintId: t.sprint_id ?? null,
      boardId: t.board_id ?? null,
      assignee: t.assignee_id != null ? `#${t.assignee_id}` : null,
    };
  },

  // Team
  async listTeam() {
    return api.get('/team');
  },

  // Progress
  async getProgressSummary(params = {}) {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null))
    ).toString();
    const path = query ? `/progress/summary?${query}` : '/progress/summary';
    return api.get(path);
  },
};

export default Services;
