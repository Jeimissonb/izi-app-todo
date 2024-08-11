import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { TodoList } from './pages/todo-list/TodoList';
import './globals.scss'
import { AuthProvider } from './contexts/AuthContext';

export function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </AuthProvider >
    </Router>
  );
}