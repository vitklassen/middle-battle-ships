import { LeaderboardItem } from './types'
import styles from './LeaderBoard.module.css'
import clsx from 'clsx'
import star from './star.svg'

export const LeaderBoardRow = (item: LeaderboardItem) => {
  return (
    <div
      className={clsx(
        styles.row,
        styles.cell,
        item.isUser && styles.cellAccent
      )}>
      <span className={clsx(styles.item, styles.itemAlignRight)}>
        {item.hasStar && (
          <img src={star} alt="star" className={styles.itemIcon} />
        )}
        {item.position}
      </span>
      <span className={clsx(styles.item, styles.itemStretched)}>
        {item.avatar}
        {item.name}
      </span>
      <span className={styles.item}>{item.points}</span>
    </div>
  )
}
