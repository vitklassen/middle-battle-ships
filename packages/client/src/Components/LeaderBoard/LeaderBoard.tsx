import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { sliceLeaderboard } from './utils/sliceLeaderboard';
import styles from './LeaderBoard.module.css';
import { LeaderBoardList } from './LeaderBoardList';
import leaderBoardApi from '../../api/leaderBoardApi';
import { LeaderboardItem } from './types';
import { useSelector } from '../../Store';

type Props = {
  className?: string
}

const params = {
  ratingFieldName: 'otherField',
  limit: 10,
  cursor: 0,
};

export const LeaderBoard: React.FC<Props> = ({ className }: Props) => {
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.profile.value);
  const [leaderboard, setLeaderboard] = useState<Array<LeaderboardItem>>([]);
  const [leaderboardAfterLimit, setLeaderboardAfterLimit] = useState<
    Array<LeaderboardItem>
  >([]);

  useEffect(() => {
    leaderBoardApi.getAllLeaderBoard(params).then((data) => {
      if (!profile) {
        return;
      }

      const { leaderboard, leaderboardAfterLimit } = sliceLeaderboard(
        Object.values(data),
        params.limit,
        profile.email,
      );

      setLeaderboard(leaderboard);
      setLeaderboardAfterLimit(leaderboardAfterLimit);

      setLoading(false);
    });
  }, []);

  if (loading) return null;

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
      {leaderboardAfterLimit.length !== 0 && <div className={styles.divider} />}
      <LeaderBoardList items={leaderboardAfterLimit} />
    </div>
  );
};
