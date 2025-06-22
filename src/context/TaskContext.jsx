// frontend/src/context/TaskContext.jsx
import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helpful utility functions
  const addTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      setTasks, 
      addTask, 
      removeTask, 
      clearTasks, 
      loading, 
      setLoading 
    }}>
      {children}
    </TaskContext.Provider>
  );
}
