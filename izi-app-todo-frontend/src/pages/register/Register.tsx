import { useRef, useState } from 'react';
import { api } from '../../services/api';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Notification from '../../components/notification/Notification';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'updated' } | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'updated') => {
    clearTimeout(notificationTimeoutRef.current || undefined);
    setNotification({ message, type });
    notificationTimeoutRef.current = setTimeout(() => setNotification(null), 3000);
  };

  const isValidEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleRegister = async () => {
    const { name, email, password } = formData;
    if (!name.trim() || !email.trim() || !password.trim()) {
      return showNotification('All fields are required', 'error');
    }
    if (!isValidEmail(email)) {
      return showNotification('Email is not valid', 'error');
    }
    try {
      await api.post('/auth/register', { name, email, password });
      showNotification('User registered successfully!', 'success');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error: any) {
      console.log(error.response.data.error)
      showNotification(`${error.response.data.error}`, 'error');
    }
  };

  return (
    <>
      <div className={styles.registerContainer}>
        <h1>Register</h1>
        <div className={styles.registerContent}>
          {['Name', 'Email', 'Password'].map((field) => (
            <div key={field} className={styles.inputGroup}>
              <label htmlFor={field.toLowerCase()}>{field}</label>
              <Input
                id={field.toLowerCase()}
                type={field.toLowerCase() === 'password' ? 'password' : 'text'}
                name={field.toLowerCase()}
                value={formData[field.toLowerCase() as keyof typeof formData]}
                onChange={handleInputChange}
                placeholder={field}
              />
            </div>
          ))}
        </div>
        <div className={styles.registerActionButtons}>
          <Button label="Register 📝" primary onClick={handleRegister} type="submit" />
          <Button label="Login 🔓" onClick={() => navigate('/login')} type="button" className={styles.loginButton} />
        </div>

      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>

  );
}

export default Register;
