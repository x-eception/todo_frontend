import React, { useEffect, useState } from 'react';
import './TaskAssistant.css';

export default function TaskAssistant({ tasks }) {
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    if (!Array.isArray(tasks)) {
      setSuggestion('🧠 No tasks found. Let’s plan your day!');
    } else if (tasks.length > 5) {
      setSuggestion('💡 You’ve got a packed day! Prioritize the top 3 first and take breaks 🧘.');
    } else if (tasks.length > 0) {
      setSuggestion('🔥 Great pace! You’re all set to conquer your tasks.');
    } else {
      setSuggestion('✨ All clear! Maybe take time to learn something new today.');
    }
  }, [tasks]);

  return (
    <div className="assistant-card">
      <h3 className="assistant-title">🧠 AI Task Assistant</h3>
      <p className="assistant-msg">{suggestion}</p>
    </div>
  );
}
