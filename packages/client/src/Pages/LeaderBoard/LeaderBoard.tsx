import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { Header } from '../../Components/Header/Header';
import { LeaderBoard as LeaderBoardComponent } from '../../Components/LeaderBoard';

import styles from './LeaderBoard.module.css';

export const LeaderBoard = authorizationChecker(() => (
  <>
    <Header />
    <main className={styles.root}>
      <CenteredLayout>
        <h1 className={styles.title}>Лидерборд</h1>
        <LeaderBoardComponent className={styles.leaderboard} />
      </CenteredLayout>
    </main>
  </>
));
