import { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import styles from './Login.module.scss';
import Input from '../../components/input/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/todos');
    }
  }, [user, navigate]);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <h1>LOGIN</h1>
      <div className={styles.loginContent}>
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

      <div className={styles.loginActionButtons}>
        <Button label="Login 🔓" primary onClick={handleLogin} />
        <h5> Dont't have a email registered to use TO-DO from <a href='https://www.instagram.com/iziapp/' target='_blank'>@iziapp</a>? <a href='/register'>Register now!</a> </h5>
      </div>
    </div>
  );
}

export default Login;