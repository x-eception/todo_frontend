// frontend/src/hooks/useTasks.js
import { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { fetchTasks } from '../api/api';

export default function useTasks() {
  const { tasks, setTasks } = useContext(TaskContext);
  useEffect(() => {
    const dateKey = new Date().toISOString().slice(0,10);
    fetchTasks(dateKey).then(res => setTasks(res.data));
  }, [setTasks]);
  return tasks;
}
