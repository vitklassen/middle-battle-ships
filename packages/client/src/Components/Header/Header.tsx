import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <Link to="/main" className={styles.logo} />
    <div className={styles.items}>
      <Link to="/game" className={styles.item}>Играть</Link>
      <Link to="/leaderBoard" className={styles.item}>Лидерборд</Link>
      <Link to="/forum" className={styles.item}>Форум</Link>
    </div>
    <div className={styles.bell} />
    <Link to="/profile" className={styles.iconProfile} />
  </header>
);
