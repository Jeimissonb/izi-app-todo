import React, { useMemo } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({ onChange, placeholder, ...props }: InputProps) => {
  const className = useMemo(() => {
    return styles.input;
  }, []);

  return (
    <input
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default React.memo(Input);