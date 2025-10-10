import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.js';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access the auth context. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and actions to children. */
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    /** Performs login with email/password, stores token and user. */
    setLoading(true);
    try {
      const { token: tkn, user: usr } = await authService.login(email, password);
      setToken(tkn);
      setUser(usr || { email });
      navigate('/', { replace: true });
      return true;
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const register = async (payload) => {
    /** Performs user registration and logs user in. */
    setLoading(true);
    try {
      const { token: tkn, user: usr } = await authService.register(payload);
      setToken(tkn);
      setUser(usr || { email: payload.email });
      navigate('/', { replace: true });
      return true;
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    /** Clears auth state and redirects to login. */
    setToken('');
    setUser(null);
    authService.logout();
    navigate('/login', { replace: true });
  };

  const value = useMemo(() => ({
    token, user, isAuthenticated, loading, login, register, logout
  }), [token, user, isAuthenticated, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
