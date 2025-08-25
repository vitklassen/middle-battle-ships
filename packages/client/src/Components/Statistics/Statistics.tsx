import { Link } from 'react-router-dom';
import { Button } from '../../Common/Blocks/Button';
import styles from './Statistiscs.module.css';

export const Statistics = () => (
  <div className={styles.container}>
    <h3 className={styles.title}>Ваша статистика</h3>
    <div className={styles.result}>
      <span>Сыграно игр</span>
      <span>0</span>
    </div>
    <div className={styles.result}>
      <span>Побед</span>
      <span>0</span>
    </div>
    <div className={styles.result}>
      <span>Поражений</span>
      <span>0</span>
    </div>
    <div className={styles.result}>
      <span>Рейтинг</span>
      <span>0</span>
    </div>
    <Link to="/game">
      <Button> Начать игру</Button>
    </Link>
  </div>
);
