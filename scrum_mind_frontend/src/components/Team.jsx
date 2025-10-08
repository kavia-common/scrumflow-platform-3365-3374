import React from 'react';
import { useSelector } from 'react-redux';

/**
 * PUBLIC_INTERFACE
 * Renders a simple list of team members.
 */
export default function Team() {
  const members = useSelector((s) => s.teams.members);
  return (
    <div className="panel">
      <h3 className="section-title">Team</h3>
      {members.length === 0 && <div>No team members yet.</div>}
      <ul>
        {members.map((m) => (
          <li key={m.id}>
            <strong>{m.name}</strong> — {m.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
