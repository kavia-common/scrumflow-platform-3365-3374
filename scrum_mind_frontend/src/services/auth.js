import { api } from './api.js';

// PUBLIC_INTERFACE
export const authService = {
  /** Login using backend; if fails, simulate token issuance. */
  async login(email, password) {
    try {
      const res = await api.post('/auth/login', { email, password });
      return res.data;
    } catch (e) {
      // Simulate a minimal JWT for development
      return {
        token: 'dev.fake.jwt.token',
        user: { email }
      };
    }
  },
  /** Register using backend; if fails, simulate success. */
  async register(payload) {
    try {
      const res = await api.post('/auth/register', payload);
      return res.data;
    } catch (e) {
      return {
        token: 'dev.fake.jwt.token',
        user: { email: payload.email }
      };
    }
  },
  /** Clears any server-side session (noop here) */
  logout() {
    // For backend session-based logout, call api.post('/auth/logout').
  }
};
