import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage    from './pages/AboutPage';
import GoogleLogin  from './Auth/GoogleLogin';
import PhoneLogin   from './Auth/PhoneLogin';
import TaskList     from './components/TaskList';
import { AuthProvider } from './context/AuthContext';    // ✅ import
import { TaskProvider } from './context/TaskContext';    // ✅ import
import './App.css';

function App() {
  return (
    <AuthProvider>           {/* ✅ wrap with AuthProvider */}
      <TaskProvider>         {/* ✅ wrap with TaskProvider */}
        <Router>
          <Routes>
            <Route path="/"              element={<AboutPage />} />
            <Route path="/google-login" element={<GoogleLogin />} />
            <Route path="/phone-login"  element={<PhoneLogin />} />
            <Route path="/tasks"        element={<TaskList />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
