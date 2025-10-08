import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `navlink${isActive ? ' active' : ''}`;

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation for main sections.
 */
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      <NavLink to="/backlog" className={linkClass}>Backlog</NavLink>
      <NavLink to="/sprints" className={linkClass}>Sprints</NavLink>
      <NavLink to="/team" className={linkClass}>Team</NavLink>
      <NavLink to="/progress" className={linkClass}>Progress</NavLink>
    </aside>
  );
}
