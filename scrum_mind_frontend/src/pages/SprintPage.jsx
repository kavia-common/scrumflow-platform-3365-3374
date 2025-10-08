import React from 'react';
import SprintBoard from '../components/SprintBoard';

/**
 * PUBLIC_INTERFACE
 * Sprints page showing active sprint board.
 */
export default function SprintPage() {
  return (
    <div className="page">
      <h2 className="section-title">Sprints</h2>
      <SprintBoard />
    </div>
  );
}
