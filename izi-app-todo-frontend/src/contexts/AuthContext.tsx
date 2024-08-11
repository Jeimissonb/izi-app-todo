import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Notification from '../components/notification/Notification';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'updated' } | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkUser = () => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (token && storedUser) {
      setUser(storedUser);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' | 'updated') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      setNotification(null);
    }

    setNotification({ message, type });

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimeoutRef.current = null;
    }, 3000);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', email);
      setUser(email);
      navigate('/todos');
    } catch (error) {
      console.error('Login failed', error);
      showNotification('Invalid credentials', 'error');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    showNotification('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
      {notification &&
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      }
    </>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };