import styles from './Main.module.css';
import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { Header } from '../../Components/Header';
import { Statistics } from '../../Components/Statistics';

export function Main() {
  return (
    <>
      <Header />
      <main className={styles.root}>
        <CenteredLayout>
          <h1 className={styles.title}>Морской бой</h1>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.description}>
                <h2>Морской бой - классическая игра</h2>
                <p>
                  Морской бой — тактическая игра, в которой противники по очереди атакуют корабли,
                  расположенные на игровом поле. Цель игры — первым потопить все корабли противника.
                </p>
                <p>
                  Игра ведется на двух квадратных полях размером 10×10 клеток. На одном поле игрок размещает свои корабли,
                  на другом — отмечает результаты выстрелов по кораблям противника.
                </p>
              </div>
              <div className={styles.rules}>
                <h3>Правила игры:</h3>
                <ul className={styles.list}>
                  <li>У каждого игрока есть 10 кораблей: 1 четырехпалубный, 2 трехпалубных, 3 двухпалубных и 4 однопалубных</li>
                  <li>Корабли не могут соприкасаться друг с другом даже углами</li>
                  <li>Игроки по очереди совершают выстрелы, называя координаты клетки</li>
                  <li>При попадании в корабль противника игрок получает право на дополнительный выстрел</li>
                  <li>Игра продолжается до тех пор, пока все корабли одного из игроков не будут потоплены</li>
                </ul>
              </div>
            </div>
            <Statistics />
          </div>
        </CenteredLayout>
      </main>
    </>
  );
}
