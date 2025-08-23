import { GetProfileResponse, Profile } from './types'

export const mapProfileResponse = (response: GetProfileResponse): Profile => {
  return {
    id: response.id,
    firstName: response.first_name,
    lastName: response.second_name,
    displayName: response.display_name,
    phone: response.phone,
    login: response.login,
    avatar: response.avatar,
    email: response.email,
  }
}
