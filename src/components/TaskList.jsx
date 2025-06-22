import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { fetchTasks, addTasks, completeTask, setAuthToken } from '../api/api';
import TaskAssistant from '../AI/TaskAssistant';
import BulkAddForm from './BulkAddForm';
import './TaskList.css';

export default function TaskList() {
  const { user } = useContext(AuthContext);
  const {
    tasks,
    setTasks,
    loading,
    setLoading,
    addTask,
    removeTask
  } = useContext(TaskContext);

  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    if (!user) return;

    const loadTasks = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        setAuthToken(token);

        const today = new Date().toISOString().split('T')[0];
        const response = await fetchTasks(today);
        const fetched = response.data.tasks || response.data;
        setTasks(Array.isArray(fetched) ? fetched : []);
      } catch (err) {
        console.error('❌ Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user, setTasks, setLoading]);

  const handleBulkAdd = async (titles) => {
    try {
      const response = await addTasks(titles);
      const newTasks = response.data;

      newTasks.forEach((t) => {
        if (t.success) {
          addTask({
            id: t.id,
            title: t.title,
            completedAt: null,
          });
        }
      });
    } catch (err) {
      console.error('❌ Bulk add failed:', err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      removeTask(id); // Or update if you want to show as done instead of removing
    } catch (err) {
      console.error('❌ Failed to complete task:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="task-screen">
      <div className="task-left">
        <h2>Today</h2>
        <h3 className="task-date">{date}</h3>

        <BulkAddForm onAdd={handleBulkAdd} />
        <TaskAssistant tasks={tasks} />
      </div>

      <div className="task-right">
        <h3>📝 Your Tasks</h3>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul className="bulk-task-list">
            {tasks.map((task) => (
              <li key={task.id} className="bulk-task-item">
                <span className={task.completedAt ? 'done' : ''}>{task.title}</span>
                <input
                  type="checkbox"
                  checked={!!task.completedAt}
                  onChange={() => handleComplete(task.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
