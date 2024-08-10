import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  primary?: boolean;
} 

export function Button({ label, primary = false, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${primary ? styles.primary : ''}`} {...props}>
      {label}
    </button>
  );
}