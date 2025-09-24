import { clsx } from 'clsx';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signUpFields } from './mock';
import styles from './SignUpComponent.module.css';
import { SignInUpForm } from '../SignInUpForm';
import { submitData } from '../SignInUpForm/types';
import authApi from '../../api/authApi';
import { setProfile, getProfile, loadThemeInfo } from '../../Features/profile';
import { Path } from '../../Router';

export const SignUpComponent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data: submitData) => {
    authApi.register(data).then((): void => {
      getProfile().then((profile) => {
        profile = loadThemeInfo(profile);
        dispatch(setProfile(profile));
        navigate(Path.Main);
      });
    });
  };

  return (
    <div className={clsx(styles.root)}>
      <SignInUpForm
        signInUpFields={signUpFields}
        onSubmitHandler={onSubmitHandler}
        link={Path.SignIn}
        linkText="Есть аккаунт?"
        yandexOathEnabled={false}
      />
    </div>
  );
};
