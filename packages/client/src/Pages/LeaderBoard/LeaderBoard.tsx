import { CenteredLayout } from '../../Components/CenteredLayout'
import { LeaderBoard as LeaderBoardComponent } from '../../Components/LeaderBoard'

import styles from './LeaderBoard.module.css'

export const LeaderBoard = () => {
  return (
    <div className={styles.root}>
      <CenteredLayout>
        <h1 className={styles.title}>Лидерборд</h1>
        <LeaderBoardComponent className={styles.leaderboard} />
      </CenteredLayout>
    </div>
  )
}
