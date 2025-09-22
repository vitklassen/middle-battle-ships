import { LeaderboardItem } from '../Components/LeaderBoard/types'
import apiInstance from './fetch'
import { leaderBoardParams, userParams } from './types'

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

  addUserToLeaderBoard(params: userParams) {
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
