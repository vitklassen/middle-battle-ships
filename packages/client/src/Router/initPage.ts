import { setError } from '../Features/error';
import { getProfile, setProfile } from '../Features/profile';
import { PageInitArgs } from './types';

export async function initPage({ state, dispatch, cookie }: PageInitArgs) {
  if (typeof state.profile.value !== 'undefined') {
    return;
  }
  return getProfile(cookie)
    .then((profile) => dispatch(setProfile(profile)))
    .catch((error) => {
      dispatch(setProfile(null));
      return dispatch(setError(error));
    });
}
