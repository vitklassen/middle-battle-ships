import { LeaderboardItem } from './types';

export const leaderboardMock: LeaderboardItem[] = Array(50)
  .fill(0)
  .map((_, i) => ({
    position: i + 1,
    isUser: i === 42,
    hasStar: i < 3,
    avatar: null,
    name: 'Иван Иванов',
    points: 100 - i * 2,
  }));
