import React, { useMemo } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  primary?: boolean;
}

const Button = ({ label, primary = false, ...props }: ButtonProps) => {
  const className = useMemo(() => {
    return `${styles.button} ${primary ? styles.primary : ''}`;
  }, [primary]);

  return (
    <button className={className} {...props}>
      {label}
    </button>
  );
};

export default React.memo(Button);