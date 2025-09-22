export type LeaderboardItem = {
  data: {
    id: number
    position: number
    isUser: boolean
    hasStar: boolean
    avatar: string | null
    firstName: string
    lastName: string
    otherField: number
    email: string
  }
}
