import { Profile } from './types';

export const loadThemeInfo = (profile: Profile) => {
  if (typeof window === 'undefined') {
    return profile;
  }

  // выгружаем из localStorage
  // (потом сделаем с сервера!)
  // это затычка пока не подкючили сервер
  const isThemeAltNotPArsed = localStorage.getItem('isThemeAlt');
  if (isThemeAltNotPArsed) {
    const isThemeAlt = JSON.parse(isThemeAltNotPArsed);
    profile = { ...profile, isThemeAlt };
  } else {
    const isThemeAlt = false;
    profile = { ...profile, isThemeAlt };
  }
  console.log(profile);
  return profile;
};
