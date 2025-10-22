import { Profile } from '../../Features/profile/types';
import avatarPlaceholder from '../../assets/images/profile.png';
import { API_URL } from './const';

export function getAvatarUrl({ avatar }: Pick<Profile, 'avatar'>) {
  if (!avatar) {
    return avatarPlaceholder;
  }
  return `${API_URL}/api/v2/resources${avatar}`;
}
