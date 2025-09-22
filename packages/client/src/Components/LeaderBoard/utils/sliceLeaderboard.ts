import { LeaderboardItem } from '../types'

interface IResult {
  leaderboard: LeaderboardItem[]
  leaderboardAfterLimit: LeaderboardItem[]
}

export const sliceLeaderboard = (
  leaderboard: LeaderboardItem[],
  limit: number,
  email: string
) => {
  const sortedData = leaderboard.sort(
    (a, b) => b.data.otherField - a.data.otherField
  )

  const result: IResult = { leaderboard: [], leaderboardAfterLimit: [] }
  const finish = sortedData.length < limit ? sortedData.length : limit

  for (let i = 0; i < finish; i++) {
    const curEmail = sortedData[i]?.data?.email
    const isUser = curEmail === email

    const cur = {
      ...sortedData[i]?.data,
      position: i,
      hasStar: i <= 2,
      isUser,
    }

    if (isUser && i > limit) {
      result.leaderboardAfterLimit.push({ data: cur })
    } else {
      result.leaderboard.push({ data: cur })
    }
  }

  return result
}
