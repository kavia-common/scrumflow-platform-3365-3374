import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BacklogPage from './pages/BacklogPage';
import SprintPage from './pages/SprintPage';
import TeamPage from './pages/TeamPage';
import ProgressPage from './pages/ProgressPage';

/**
 * PUBLIC_INTERFACE
 * Routes configuration for the app.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/backlog" element={<BacklogPage />} />
      <Route path="/sprints" element={<SprintPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
