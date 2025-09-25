import { useNavigate } from 'react-router';
import clsx from 'clsx';
import { Button } from '../../../Common/Blocks/Button';
import { CenteredLayout } from '../../../Common/Layouts/CenteredLayout';
import ship5 from '../../../assets/images/ship_5.png';
import ship4 from '../../../assets/images/ship_4.png';
import ship3 from '../../../assets/images/ship_3.png';
import ship2 from '../../../assets/images/ship_2.png';
import styles from './StartGameScreen.module.css';

type Props = {
  onStartGameClick: VoidFunction
}

export const StartGameScreen: React.FC<Props> = ({ onStartGameClick }) => {
  const navigate = useNavigate();

  const onMenuButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.root}>
      <CenteredLayout>
        <h1 className={styles.title}>Морской бой</h1>
        <div className={styles.buttonContainer}>
          <Button
            size="large"
            onClick={onStartGameClick}
            className={styles.button}
          >
            Старт
          </Button>
          <Button
            mode="secondary"
            size="large"
            onClick={onMenuButtonClick}
            className={styles.button}
          >
            Меню
          </Button>
        </div>
      </CenteredLayout>
      <img src={ship5} alt="" className={clsx(styles.ship, styles.ship4)} />
      <img src={ship4} alt="" className={clsx(styles.ship, styles.ship3)} />
      <img src={ship3} alt="" className={clsx(styles.ship, styles.ship2)} />
      <img src={ship2} alt="" className={clsx(styles.ship, styles.ship1)} />
      <img src={ship2} alt="" className={clsx(styles.ship, styles.ship0)} />
    </div>
  );
};
