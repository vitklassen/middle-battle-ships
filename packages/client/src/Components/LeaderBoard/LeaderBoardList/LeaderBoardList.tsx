import clsx from 'clsx'
import { LeaderboardItem } from '../types'
import star from '../../../assets/images/star.svg'

import styles from '../LeaderBoard.module.css'

type Props = {
  items: LeaderboardItem[]
}

export const LeaderBoardList = ({ items }: Props) => {
  return (
    <>
      {items.map(item => (
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
      ))}
    </>
  )
}
