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

export type Profile = {
  id: number
  avatar: string | null
  firstName: string
  lastName: string
  displayName: string
  phone: string
  email: string
  login: string
}

export interface ProfileState {
  value: Profile | null
}
