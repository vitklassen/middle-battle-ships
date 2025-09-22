import { clsx } from 'clsx'
import { LeaderboardItem } from '../types'
import star from '../../../assets/images/star.svg'

import styles from '../LeaderBoard.module.css'
import { useSelector } from '../../../Store'

type Props = {
  items: LeaderboardItem[]
}

export const LeaderBoardList: React.FC<Props> = ({ items }) => (
  <>
    {items.map(({ data }, index) => {
      const { id, avatar, firstName, otherField, isUser } = data
      return (
        <div
          key={id}
          className={clsx(
            styles.row,
            styles.cell,
            isUser && styles.cellAccent
          )}>
          <span className={clsx(styles.item, styles.itemAlignRight)}>
            {index <= 2 && (
              <img src={star} alt="star" className={styles.itemIcon} />
            )}
            {index + 1}
          </span>
          <span className={clsx(styles.item, styles.itemStretched)}>
            {avatar}
            {firstName}
          </span>
          <span className={styles.item}>{otherField}</span>
        </div>
      )
    })}
  </>
)
