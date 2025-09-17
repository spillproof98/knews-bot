import React from 'react';

export default function SessionControl({ onReset }) {
  return (
    <div className="session-control">
      <button onClick={onReset}>Reset Session</button>
    </div>
  );
}
