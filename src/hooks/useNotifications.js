// frontend/src/hooks/useNotifications.js
import { useState } from 'react';

export default function useNotifications() {
  const [toasts, setToasts] = useState([]);
  const notify = msg => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };
  return { toasts, notify };
}
