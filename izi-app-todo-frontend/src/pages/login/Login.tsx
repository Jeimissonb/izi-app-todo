import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import { api } from '../../services/api';
import styles from './Login.module.scss';
import { Input } from '../../components/input/Input';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/todos');
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
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
      <Button label="Login" primary onClick={handleLogin} />
    </div>
  );
}