import clsx from 'clsx'
import styles from './LeaderBoard.module.css'
import { leaderboardMock } from './mock'
import { useMemo } from 'react'
import { sliceLeaderboard } from './sliceLeaderboard'
import { LeaderBoardRow } from './LeaderBoardRow'

type Props = {
  className?: string
}

export const LeaderBoard = ({ className }: Props) => {
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
      {leaderboard.map(item => (
        <LeaderBoardRow {...item} />
      ))}
      {leaderboardAfterLimit.length !== 0 && (
        <div className={styles.divider}></div>
      )}
      {leaderboardAfterLimit.map(item => (
        <LeaderBoardRow {...item} />
      ))}
    </div>
  )
}
