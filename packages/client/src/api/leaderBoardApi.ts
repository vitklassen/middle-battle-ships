import { LeaderboardItem } from '../Components/LeaderBoard/types'
import apiInstance from './fetch'
import { leaderBoardParams, userResult } from './types'

export class LeaderBoardApi {
  getAllLeaderBoard(
    params: leaderBoardParams
  ): Promise<Array<LeaderboardItem>> {
    return apiInstance.post('leaderboard/wolves', {
      data: {
        ratingFieldName: params.ratingFieldName,
        limit: params.limit,
        cursor: params.cursor,
      },
    })
  }

  addUserToLeaderBoard(
    params: userResult<{ myField: string; otherField: number }>
  ) {
    return apiInstance.post('leaderboard', {
      data: {
        teamName: params.teamName,
        ratingFieldName: params.ratingFieldName,
        data: params.data,
      },
    })
  }
}

const leaderBoardApi = new LeaderBoardApi()

export default leaderBoardApi
