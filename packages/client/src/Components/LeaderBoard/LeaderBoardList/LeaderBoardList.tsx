import { clsx } from 'clsx';
import { LeaderboardItem } from '../types';
import star from '../../../assets/images/star.svg';

import styles from '../LeaderBoard.module.css';
import { getAvatarUrl } from '../../../Common/utils/getAvatarUrl';

type Props = {
  items: LeaderboardItem[]
}

export const LeaderBoardList: React.FC<Props> = ({ items }) => (
  <>
    {items.map(({ data }, index) => {
      const {
        id, avatar, firstName, lastName, otherField, isUser, position,
      } =
        data;
      const fullName = `${firstName} ${lastName}`;
      return (
        <div
          key={id}
          className={clsx(
            styles.row,
            styles.cell,
            isUser && styles.cellAccent,
          )}
        >
          <span className={clsx(styles.item, styles.itemAlignRight)}>
            {position <= 2 && (
              <img src={star} alt="star" className={styles.itemIcon} />
            )}
            {position}
          </span>
          <span className={clsx(styles.item, styles.itemStretched)}>
            <img src={getAvatarUrl({ avatar })} alt="" className={styles.avatar} />
            {fullName}
          </span>
          <span className={styles.item}>{otherField}</span>
        </div>
      );
    })}
  </>
);
