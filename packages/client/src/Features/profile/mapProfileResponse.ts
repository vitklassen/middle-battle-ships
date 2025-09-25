import { GetProfileResponse } from '../../api/types';
import { Profile } from './types';

export const mapProfileResponse = (response: GetProfileResponse): Profile => ({
  id: response.id,
  firstName: response.first_name,
  lastName: response.second_name,
  displayName: response.display_name,
  phone: response.phone,
  login: response.login,
  avatar: response.avatar,
  email: response.email,
  isThemeAlt: false,
  positions: null,
});
