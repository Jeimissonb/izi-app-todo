import { useRef, useState } from 'react';
import { api } from '../../services/api';
import Button from '../../components/button/Button';
import styles from './Register.module.scss';
import Input from '../../components/input/Input';
import Notification from '../../components/notification/Notification';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'updated' } | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navitate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await await api.post('/auth/register', { name, email, password });
      showNotification('User registered: ' + response, 'success');

    } catch (error) {
      console.error('Registration failed', error);
      showNotification('Registration failed: ' + error, 'error');
    }
  };

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

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <div className={styles.registerContent}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className={styles.registerActionButtons}>
        <Button label="Register" primary onClick={handleRegister} type="submit" />
        <Button label="Login" onClick={() => navitate('/login')} type="button" className={styles.loginButton} />
      </div>
      {notification &&
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      }
    </div>
  );
}

export default Register