import styles from './Cell.module.css';

type Props = {
  icon: string
  label: string
}

export const Cell: React.FC<React.PropsWithChildren<Props>> = ({
  icon,
  label,
  children,
}) => (
  <div className={styles.root}>
    <div className={styles.icon}>
      <img src={icon} alt={label} />
    </div>
    <div>
      <div>{label}</div>
      <div className={styles.contentText}>{children}</div>
    </div>
  </div>
);
