import React, { useState } from 'react';
import Button from '../components/Common/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form that authenticates and redirects to intended route. */
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      // Navigate handled in context. If needed, could pass "from".
    } catch (e) {
      setErr('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <div className="section-title">Welcome back</div>
      <div style={{ color: 'var(--color-muted)', marginBottom: 12 }}>
        Sign in to continue to your workspace.
      </div>
      {err ? <div className="empty" style={{ textAlign: 'left' }}>{err}</div> : null}
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input id="password" className="input" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</Button>
        <div style={{ fontSize: 14 }}>
          Don't have an account? <a href="/register">Create one</a>
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>
          After login, you will be redirected to {from}
        </div>
      </form>
    </>
  );
}
