import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.css';

type Props = {
  mode?: 'primary' | 'secondary'
  stretched?: boolean
  onClick?: React.MouseEventHandler
  className?: string
}

export const Button: React.FC<PropsWithChildren<Props>> = ({
  mode = 'primary',
  stretched,
  children,
  onClick,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      className,
      styles.button,
      mode === 'primary' && styles.buttonPrimary,
      mode === 'secondary' && styles.buttonSecondary,
      stretched && styles.buttonStretched,
    )}
  >
    {children}
  </button>
);
