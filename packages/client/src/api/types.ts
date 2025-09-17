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

export type GetAppID = {
  service_id: string
}
