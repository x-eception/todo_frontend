import React from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onComplete }) {
  return (
    <li className={`task-item ${task.completedAt ? 'completed' : ''}`}>
      <span className="task-title">{task.title}</span>
      {!task.completedAt ? (
        <button className="complete-button" onClick={onComplete} title="Mark as done">
          ✓
        </button>
      ) : (
        <span className="completed-mark">✅</span>
      )}
    </li>
  );
}
