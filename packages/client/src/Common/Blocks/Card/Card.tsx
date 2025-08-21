import styles from './Card.module.css';

export const Card: React.FC<React.PropsWithChildren> = ({ children }) => <div className={styles.card}>{children}</div>;
