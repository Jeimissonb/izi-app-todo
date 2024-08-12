import { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

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
        {['Email', 'Password'].map((field) => (
          <div key={field} className={styles.inputGroup}>
            <label htmlFor={field.toLowerCase()}>{field}</label>
            <Input
              id={field.toLowerCase()}
              type={field.toLowerCase() === 'password' ? 'password' : 'email'}
              value={field === 'Email' ? email : password}
              onChange={(e) => field === 'Email' ? setEmail(e.target.value) : setPassword(e.target.value)}
              placeholder={field}
            />
          </div>
        ))}
      </div>

      <div className={styles.loginActionButtons}>
        <Button label="Login 🔓" primary onClick={handleLogin} />
        <h5>
          Don't have an email registered to use TO-DO from{' '}
          <a href='https://www.instagram.com/iziapp/' target='_blank' rel="noopener noreferrer">@iziapp</a>?{' '}
          <a href='/register'>Register now!</a>
        </h5>
      </div>
    </div>
  );
}

export default Login;
