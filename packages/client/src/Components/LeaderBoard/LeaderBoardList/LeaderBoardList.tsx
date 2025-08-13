import clsx from 'clsx';
import { LeaderboardItem } from '../types';
import star from '../../../assets/images/star.svg';

import styles from '../LeaderBoard.module.css';

type Props = {
  items: LeaderboardItem[]
}

export const LeaderBoardList: React.FC<Props> = ({ items }) => (
  <>
    {items.map(({
      avatar, name, position, isUser, hasStar, points,
    }) => (
      <div
        key={position}
        className={clsx(
          styles.row,
          styles.cell,
          isUser && styles.cellAccent,
        )}
      >
        <span className={clsx(styles.item, styles.itemAlignRight)}>
          {hasStar && (
          <img src={star} alt="star" className={styles.itemIcon} />
          )}
          {position}
        </span>
        <span className={clsx(styles.item, styles.itemStretched)}>
          {avatar}
          {name}
        </span>
        <span className={styles.item}>{points}</span>
      </div>
    ))}
  </>
);
