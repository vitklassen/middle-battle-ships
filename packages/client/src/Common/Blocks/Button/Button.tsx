import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';

type Props = {
  mode?: 'primary' | 'secondary';
  size?: 'large' | 'medium';
  stretched?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  mode = 'primary',
  size = 'medium',
  stretched,
  children,
  onClick,
  type = 'button',
  className,
}) => (
  <button
    /* eslint-disable react/button-has-type */
    type={type}
    /* eslint-enable react/button-has-type */
    onClick={onClick}
    className={clsx(
      className,
      styles.button,
      mode === 'primary' && styles.buttonPrimary,
      mode === 'secondary' && styles.buttonSecondary,
      size === 'medium' && styles.buttonMedium,
      size === 'large' && styles.buttonLarge,
      stretched && styles.buttonStretched,
    )}
  >
    {children}
  </button>
);
