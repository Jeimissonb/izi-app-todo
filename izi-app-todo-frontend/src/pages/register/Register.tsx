import { useState } from 'react';
import { Button } from '../../components/button/Button';
import { api } from '../../services/api';
import styles from './Register.module.scss';
import { Input } from '../../components/input/Input';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      const response = await await api.post('/auth/register', { name, email, password });
      console.log('User registered', response.data);
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
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
      <Button label="Register" primary onClick={handleRegister} type="submit" />
    </div>
  );
}