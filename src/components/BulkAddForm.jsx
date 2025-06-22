import React, { useState, useEffect } from 'react';
import './BulkAddForm.css';

export default function BulkAddForm({ onAdd }) {
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSubmit = (e) => {
    e.preventDefault();
    const titles = text
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);
    if (titles.length > 0) {
      onAdd(titles);
      setText('');
    }
  };

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`bulk-wrapper ${theme}`}>
      <button className="toggle-button" onClick={toggleTheme}>
        {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <form className="bulk-form" onSubmit={handleSubmit}>
        <label className="bulk-label">✍️ Add Multiple Tasks</label>
        <textarea
          className="bulk-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Write one task per line…\nExample:\n- Morning walk\n- Finish project proposal`}
          rows={6}
        />
        <button className="bulk-button" type="submit">
          🚀 Add Tasks
        </button>
      </form>
    </div>
  );
}
