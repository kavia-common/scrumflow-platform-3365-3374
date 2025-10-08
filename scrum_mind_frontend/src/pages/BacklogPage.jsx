import React from 'react';
import Backlog from '../components/Backlog';

/**
 * PUBLIC_INTERFACE
 * Backlog page listing backlog items.
 */
export default function BacklogPage() {
  return (
    <div className="page">
      <h2 className="section-title">Backlog</h2>
      <Backlog />
    </div>
  );
}
