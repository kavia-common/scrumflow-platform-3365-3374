import React from 'react';
import Team from '../components/Team';

/**
 * PUBLIC_INTERFACE
 * Team page listing members.
 */
export default function TeamPage() {
  return (
    <div className="page">
      <h2 className="section-title">Team</h2>
      <Team />
    </div>
  );
}
