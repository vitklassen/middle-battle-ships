export type GetProfileResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string | null
  email: string
}

export type leaderBoardParams = {
  ratingFieldName: string
  limit: number
  cursor: number
}

export type userResult<T> = Pick<leaderBoardParams, 'ratingFieldName'> & {
  data: T
  teamName: string
}
