import clsx from 'clsx';
import styles from './Card.module.css';

type Props = {
  className?: string
  onClick?: VoidFunction;
} & React.PropsWithChildren

export const Card: React.FC<Props> = ({ children, className, onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div onClick={onClick} className={clsx(styles.card, className)}>{children}</div>
);
