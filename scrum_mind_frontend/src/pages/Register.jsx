import React, { useState } from 'react';
import Button from '../components/Common/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form that creates a user and logs them in. */
  const { register, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await register({ email, name, password });
    } catch {
      setErr('Registration failed.');
    }
  };

  return (
    <>
      <div className="section-title">Create your account</div>
      <div style={{ color: 'var(--color-muted)', marginBottom: 12 }}>
        Start organizing your sprints, tasks, and boards.
      </div>
      {err ? <div className="empty" style={{ textAlign: 'left' }}>{err}</div> : null}
      <form className="form" onSubmit={onSubmit}>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input id="name" className="input" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input id="password" className="input" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
        <div style={{ fontSize: 14 }}>
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </form>
    </>
  );
}
