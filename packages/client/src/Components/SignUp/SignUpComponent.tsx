import clsx from 'clsx';
import { FC } from 'react';
import { signUpFields } from './mock';
import styles from './SignUpComponent.module.css';
import { SignInUpForm } from '../SignInUpForm';
import { submitData } from '../SignInUpForm/types';
import authApi from '../../api/authApi';

export const SignUpComponent: FC = () => {
  const onSubmitHandler = (data: submitData) => {
    console.log(data);
    authApi.register(data).then((res: unknown): void => {
      // данные после авторизации, пока что тут заглушка,
      // т.к. остальные страницы не реализованы
      console.log(res);
      // стоит добавить authApi.getUserInfo();
      // и затем отлов ошибок и отправка на 404 или 500
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
