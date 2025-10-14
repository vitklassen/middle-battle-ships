/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Header.module.css';
import { Path } from '../../Router';
import { setTheme } from '../../Features/profile';
import { useSelector } from '../../Store';
import { Card } from '../../Common/Blocks/Card';

export const Header = () => {
  const dispatch = useDispatch();
  const isThemeAlt = useSelector((state) => state.profile.value?.isThemeAlt);

  const changeTheme = () => {
    // Затычка пока не подключили сервер
    localStorage.setItem('isThemeAlt', JSON.stringify(!isThemeAlt));
    dispatch(setTheme({ isThemeAlt: !isThemeAlt }));
  };
  return (
    <Card className={styles.header}>
      <Link to={Path.Main} className={styles.logoContainer}>
        <span className={styles.logo} />
        Морской бой
      </Link>
      <div className={styles.items}>
        <Link to={Path.Game} className={styles.item}>Играть</Link>
        <Link to={Path.Leaderboard} className={styles.item}>Лидерборд</Link>
        <Link to={Path.Forum} className={styles.item}>Форум</Link>
      </div>
      <div className={`${styles.bell} ${isThemeAlt ? styles.altBell : ''}`} />
      <Link to={Path.Profile} className={`${styles.iconProfile} ${isThemeAlt ? styles.altProfileIcon : ''}`} />
      <button className={`${styles.clicker} ${isThemeAlt ? styles.altClicker : ''}`} type="button" id="theme_switcher" onClick={changeTheme} />
    </Card>
  );
};
