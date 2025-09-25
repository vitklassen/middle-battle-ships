import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { Header } from '../../Components/Header/Header';
import { LeaderBoard as LeaderBoardComponent } from '../../Components/LeaderBoard';
import { initPage, PageInitArgs, usePage } from '../../Router';

import styles from './LeaderboardPage.module.css';

export const initLeaderboardPage = async (args: PageInitArgs) => {
  await initPage(args);
};

export const LeaderboardPage = authorizationChecker(() => {
  usePage({ initPage: initLeaderboardPage });

  return (
    <>
      <Header />
      <main className={styles.root}>
        <CenteredLayout>
          <h1 className={styles.title}>Лидерборд</h1>
          <LeaderBoardComponent className={styles.leaderboard} />
        </CenteredLayout>
      </main>
    </>
  );
});
