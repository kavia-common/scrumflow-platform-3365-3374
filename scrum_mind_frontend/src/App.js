import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

import Sidebar from './components/Layout/Sidebar.jsx';
import TopBar from './components/Layout/TopBar.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Boards from './pages/Boards.jsx';
import BoardDetail from './pages/BoardDetail.jsx';
import Sprints from './pages/Sprints.jsx';
import Tasks from './pages/Tasks.jsx';
import Teams from './pages/Teams.jsx';
import Settings from './pages/Settings.jsx';

// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/boards" replace />} />
            <Route path="boards" element={<Boards />} />
            <Route path="boards/:boardId" element={<BoardDetail />} />
            <Route path="sprints" element={<Sprints />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="teams" element={<Teams />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <TopBar />
      <main className="content">
        <Routes>
          <Route index element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:boardId" element={<BoardDetail />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh', padding: 16 }}>
      <div className="card" style={{ width: 420, maxWidth: '92vw', padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
          <div className="brand-badge">S</div>
          <div style={{ fontWeight: 900, fontSize: 20 }}>Scrum Mind</div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default App;
