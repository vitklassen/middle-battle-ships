import clsx from 'clsx';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signInFields } from './mock';
import styles from './SignInComponent.module.css';
import { SignInUpForm } from '../SignInUpForm';
import { submitData } from '../SignInUpForm/types';
import authApi from '../../api/authApi';
import { getProfile, setProfile } from '../../Features/profile';
import { Path } from '../../Router';

export const SignInComponent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data: submitData) => {
    authApi.login(data).then((): void => {
      getProfile().then((profile) => {
        dispatch(setProfile(profile));
        navigate(Path.Main);
      });
    });
  };

  const onYandexAuthHandler = (data: submitData) => {
    authApi.getYandexOAuthID(data).then((res): void => {
      const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.service_id}&redirect_uri=${data.redirect_uri}`;
      document.location.href = URL;
    });
  };

  return (
    <div className={clsx(styles.root)}>
      <SignInUpForm
        signInUpFields={signInFields}
        onSubmitHandler={onSubmitHandler}
        onYandexAuthHandler={onYandexAuthHandler}
        link={Path.SignUp}
        linkText="Нет аккаунта?"
        yandexOathEnabled
      />
    </div>
  );
};
