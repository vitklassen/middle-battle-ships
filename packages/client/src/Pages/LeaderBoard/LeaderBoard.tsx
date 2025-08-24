import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { LeaderBoard as LeaderBoardComponent } from '../../Components/LeaderBoard';

import styles from './LeaderBoard.module.css';

export function LeaderBoard() {
  return (
    <div className={styles.root}>
      <CenteredLayout onlyHorizontally>
        <h1 className={styles.title}>Лидерборд</h1>
        <LeaderBoardComponent className={styles.leaderboard} />
      </CenteredLayout>
    </div>
  );
}
