import { useState } from 'react';
import { Button } from '../../components/button/Button';
import styles from './Login.module.scss';
import { Input } from '../../components/input/Input';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    login(email, password);
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