import { clsx } from 'clsx';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { signUpFields } from './mock';
import styles from './SignUpComponent.module.css';
import { SignInUpForm } from '../SignInUpForm';
import { submitData } from '../SignInUpForm/types';
import authApi from '../../api/authApi';
import { setProfile, getProfile } from '../../Features/profile';

export const SignUpComponent: FC = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = (data: submitData) => {
    authApi.register(data).then((): void => {
      getProfile().then((profile) => {
        dispatch(setProfile(profile));
      });
    });
  };

  return (
    <div className={clsx(styles.root)}>
      <SignInUpForm
        signInUpFields={signUpFields}
        onSubmitHandler={onSubmitHandler}
        link="./sign-in"
        linkText="Есть аккаунт?"
      />
    </div>
  );
};
