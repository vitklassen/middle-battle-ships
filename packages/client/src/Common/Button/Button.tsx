import { FC } from 'react';

import { clsx } from 'clsx';
import styles from './Button.module.css';

interface IProps {
  text: string
  onClick?: () => void
}

export const Button: FC<IProps> = ({ text, onClick }) => (
  <button className={clsx(styles.button)} onClick={onClick} type="button">
    {text}
  </button>
);
