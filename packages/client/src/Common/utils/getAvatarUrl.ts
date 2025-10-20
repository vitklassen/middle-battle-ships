import { Profile } from '../../Features/profile/types';
import avatarPlaceholder from '../../assets/images/profile.png';

export function getAvatarUrl({ avatar }: Pick<Profile, 'avatar'>) {
  if (!avatar) {
    return avatarPlaceholder;
  }
  return `${import.meta.env.VITE_API_URL}/api/v2/resources${avatar}`;
}
