import clsx from 'clsx';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { signInFields } from './mock';
import styles from './SignInComponent.module.css';
import { SignInUpForm } from '../SignInUpForm';
import { submitData } from '../SignInUpForm/types';
import authApi from '../../api/authApi';
import { getProfile, setProfile } from '../../Features/profile';

export const SignInComponent: FC = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = (data: submitData) => {
    console.log(data);
    authApi.login(data).then((): void => {
      getProfile().then((profile) => {
        dispatch(setProfile(profile));
      });
    });
  };

  return (
    <div className={clsx(styles.root)}>
      <SignInUpForm
        signInUpFields={signInFields}
        onSubmitHandler={onSubmitHandler}
        link="../sign-up"
        linkText="Нет аккаунта?"
      />
    </div>
  );
};
