import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import { Suspense, lazy } from 'react';
import './globals.scss'

const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));
const TodoList = lazy(() => import('./pages/todo-list/TodoList'));

export function App() {


  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/todos" element={<TodoList />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider >
    </Router>
  );
}