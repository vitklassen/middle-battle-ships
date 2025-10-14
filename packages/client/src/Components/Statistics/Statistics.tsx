import { Link } from 'react-router-dom';
import { Button } from '../../Common/Blocks/Button';
import styles from './Statistiscs.module.css';
import { Card } from '../../Common/Blocks/Card';

export const Statistics = () => (
  <Card className={styles.container}>
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
  </Card>
);
