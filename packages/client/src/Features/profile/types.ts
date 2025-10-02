export type Profile = {
  id: number
  avatar: string | null
  firstName: string
  lastName: string
  displayName: string
  phone: string
  email: string
  login: string
  isThemeAlt: boolean
  positions: Record <string, number> | null
}

export interface ProfileState {
  value?: Profile | null
}
