// frontend/src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todo-backend-pkro.onrender.com', // 🔁 Change this when deploying
});

// Sets token for all future requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// API Methods
export const fetchTasks = (date) => api.get(`/tasks?date=${date}`);
export const addTasks = (titles) => api.post('/tasks', { titles });
export const completeTask = (id) => api.post(`/tasks/${id}/complete`);

export default api;

