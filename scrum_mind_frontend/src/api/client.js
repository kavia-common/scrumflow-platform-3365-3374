/**
 * Lightweight API client for Scrum Mind frontend.
 * Uses REACT_APP_API_BASE_URL or defaults to http://localhost:3001.
 * Adds JSON handling and basic error reporting.
 * Note: Set REACT_APP_API_BASE_URL in .env to point to your backend origin.
 */

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

/**
 * Build a URL with path while ensuring there are no duplicate slashes.
 * @param {string} path
 * @returns {string}
 */
function buildUrl(path) {
  const cleanPath = path ? `/${path}`.replace(/\/{2,}/g, '/') : '';
  return `${BASE_URL}${cleanPath}`;
}

/**
 * PUBLIC_INTERFACE
 * Perform a JSON fetch with standard headers and error handling.
 * @param {string} path - API path, e.g., '/api/tasks'
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>} parsed JSON
 */
export async function apiFetch(path, options = {}) {
  /** Fetches a JSON response from the API and throws on non-2xx */
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const resp = await fetch(buildUrl(path), { ...options, headers });
  const contentType = resp.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!resp.ok) {
    const message = isJson ? (await resp.json()).detail || 'API error' : await resp.text();
    throw new Error(`API ${resp.status}: ${message}`);
  }
  return isJson ? resp.json() : resp.text();
}

/**
 * PUBLIC_INTERFACE
 * Convenience HTTP methods
 */
export const api = {
  /** GET wrapper */
  get: (path) => apiFetch(path, { method: 'GET' }),
  /** POST wrapper */
  post: (path, body) => apiFetch(path, { method: 'POST', body: JSON.stringify(body) }),
  /** PUT wrapper */
  put: (path, body) => apiFetch(path, { method: 'PUT', body: JSON.stringify(body) }),
  /** PATCH wrapper */
  patch: (path, body) => apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) }),
  /** DELETE wrapper */
  delete: (path) => apiFetch(path, { method: 'DELETE' }),
};

export default api;
