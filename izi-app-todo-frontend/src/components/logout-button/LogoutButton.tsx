import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LogoutButton.module.scss';

interface UserProps {
  user: string;
}
function LogoutButton({ user }: UserProps) {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.logoutInfo}>
      <button className={styles.userButton} onClick={toggleDropdown}>
        {user} {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu} >
          <button className={styles.logoutButton} onClick={logout}>Logout 🔐</button>
        </div>
      )}
    </div>
  );
}

export default LogoutButton;
