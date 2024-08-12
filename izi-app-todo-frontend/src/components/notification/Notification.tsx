import React, { useEffect } from 'react';
import styles from './Notification.module.scss';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'updated';
  onClose: () => void;
}

function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {message}
    </div>
  );
}

export default React.memo(Notification);