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
  value?: Profile | null
}
