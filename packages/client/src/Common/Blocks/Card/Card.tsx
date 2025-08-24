import clsx from 'clsx';
import styles from './Card.module.css';

type Props = {
  className?: string
} & React.PropsWithChildren

export const Card: React.FC<Props> = ({ children, className }) => (
  <div className={clsx(styles.card, className)}>{children}</div>
);
