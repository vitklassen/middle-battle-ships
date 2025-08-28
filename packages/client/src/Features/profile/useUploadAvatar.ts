import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import profileApi from '../../api/profileApi';
import { setAvatar } from './profileSlice';

type Params = {
  onSuccess?: VoidFunction
  onError?: (reason: string) => void
}

export const useUploadAvatar = ({ onSuccess, onError }: Params) => {
  const dispatch = useDispatch();

  return useCallback((file: File) => {
    profileApi
      .uploadAvatar(file)
      .then(({ avatar }) => {
        dispatch(setAvatar({ avatar }));
        onSuccess?.();
      })
      .catch(({ reason }) => {
        onError?.(reason);
      });
  }, []);
};
