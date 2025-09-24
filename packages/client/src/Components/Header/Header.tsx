import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Path } from '../../Router';
import { useGeolocationApi } from '../../hooks/useGeolocationApi';
import { GeoPopup } from '../GeoPopup';

export const Header = () => {
  const { data, setData, getUserPosition } = useGeolocationApi();

  return (
    <header className={styles.header}>
      <Link to={Path.Main} className={styles.logo} />
      <div className={styles.items}>
        <Link to={Path.Game} className={styles.item}>
          Играть
        </Link>
        <Link to={Path.Leaderboard} className={styles.item}>
          Лидерборд
        </Link>
        <Link to={Path.Forum} className={styles.item}>
          Форум
        </Link>
      </div>
      <div className={styles.bell} />
      <Link to={Path.Profile} className={styles.iconProfile} />
      {/* eslint-disable-next-line */}
      <button type="button" className={styles.iconGeolocation} onClick={getUserPosition} />
      {data && <GeoPopup data={data} onResetData={setData} />}
    </header>
  );
};
