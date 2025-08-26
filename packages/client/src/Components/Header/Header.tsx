import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Path } from '../../Router';

export const Header = () => (
  <header className={styles.header}>
    <Link to={Path.Main} className={styles.logo} />
    <div className={styles.items}>
      <Link to={Path.Game} className={styles.item}>Играть</Link>
      <Link to={Path.Leaderboard} className={styles.item}>Лидерборд</Link>
      <Link to={Path.Forum} className={styles.item}>Форум</Link>
    </div>
    <div className={styles.bell} />
    <Link to={Path.Profile} className={styles.iconProfile} />
  </header>
);
