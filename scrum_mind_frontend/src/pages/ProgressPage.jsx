import React from 'react';
import Progress from '../components/Progress';

/**
 * PUBLIC_INTERFACE
 * Progress page showing metrics.
 */
export default function ProgressPage() {
  return (
    <div className="page">
      <h2 className="section-title">Progress</h2>
      <Progress />
    </div>
  );
}
