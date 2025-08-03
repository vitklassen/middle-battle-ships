import { LeaderboardItem } from './types'

const LIMIT = 10

export const sliceLeaderboard = (leaderboard: LeaderboardItem[]) => {
  const userItem = leaderboard.find(item => item.isUser)

  return {
    leaderboard: leaderboard.slice(0, LIMIT),
    leaderboardAfterLimit:
      userItem && userItem.position > LIMIT ? [userItem] : [],
  }
}
