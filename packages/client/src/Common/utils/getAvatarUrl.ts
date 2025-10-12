import { Profile } from '../../Features/profile/types';
import avatarPlaceholder from '../../assets/images/profile.png';

export function getAvatarUrl({ avatar }: Pick<Profile, 'avatar'>) {
  if (!avatar) {
    return avatarPlaceholder;
  }
  return `http://localhost:3001/api/v2/resources${avatar}`;
}
