import clsx from 'clsx'
import { leaderboardMock } from './mock'
import { useMemo } from 'react'
import { sliceLeaderboard } from './utils/sliceLeaderboard'
import styles from './LeaderBoard.module.css'
import { LeaderBoardList } from './LeaderBoardList'

type Props = {
  className?: string
}

export const LeaderBoard: React.FC<Props> = ({ className }: Props) => {
  const { leaderboard, leaderboardAfterLimit } = useMemo(
    () => sliceLeaderboard(leaderboardMock),
    []
  )

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.row}>
        <span className={clsx(styles.item, styles.itemAlignRight)}>Место</span>
        <span className={clsx(styles.item, styles.itemStretched)}>
          Пользователь
        </span>
        <span className={styles.item}>Очки</span>
      </div>
      <LeaderBoardList items={leaderboard} />
      {leaderboardAfterLimit.length !== 0 && (
        <div className={styles.divider}></div>
      )}
      <LeaderBoardList items={leaderboardAfterLimit} />
    </div>
  )
}
