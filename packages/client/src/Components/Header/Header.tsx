/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Header.module.css';
import { Path } from '../../Router';
import { setTheme } from '../../Features/profile';
import { useSelector } from '../../Store';
import { useGeolocationApi } from '../../hooks/useGeolocationApi';
import { GeoPopup } from '../GeoPopup';

export const Header = () => {
  const dispatch = useDispatch();
  const isThemeAlt = useSelector((state) => state.profile.value?.isThemeAlt);
  const { data, setData, getUserPosition } = useGeolocationApi();

  const changeTheme = () => {
    // Затычка пока не подключили сервер
    localStorage.setItem('isThemeAlt', JSON.stringify(!isThemeAlt));
    dispatch(setTheme({ isThemeAlt: !isThemeAlt }));
  };
  return (
    <header className={styles.header}>
      <Link to={Path.Main} className={styles.logo} />
      <div className={styles.items}>
        <Link to={Path.Game} className={styles.item}>Играть</Link>
        <Link to={Path.Leaderboard} className={styles.item}>Лидерборд</Link>
        <Link to={Path.Forum} className={styles.item}>Форум</Link>
      </div>
      <div className={`${styles.bell} ${isThemeAlt ? styles.altBell : ''}`} />
      <Link to={Path.Profile} className={`${styles.iconProfile} ${isThemeAlt ? styles.altProfileIcon : ''}`} />
      <button className={`${styles.clicker} ${isThemeAlt ? styles.altClicker : ''}`} type="button" id="theme_switcher" onClick={changeTheme} />
      <button type="button" className={styles.iconGeolocation} onClick={getUserPosition} />
      {data && <GeoPopup data={data} onResetData={setData} />}
    </header>
  );
};
