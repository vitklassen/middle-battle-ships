import clsx from 'clsx';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { signUpFields } from './mock';
import styles from './SignUpComponent.module.css';
import { SignInUpForm } from '../SignInUpForm';
import { submitData } from '../SignInUpForm/types';
import authApi from '../../api/authApi';

export const SignUpComponent: FC = () => {
  const navigate = useNavigate();
  const onSubmitHandler = (data: submitData) => {
    console.log(data);
    authApi.register(data)
      .then((): void => {
        authApi.getUserInfo()
          .then((res: unknown) => {
            console.log(res);
            // данные после входа, пока что тут заглушка,
            // т.к. redux не подключен
            navigate('../main');
          })
          .catch((err: Error) => {
            console.log(err);
            if (err.message.includes('500')) {
              navigate('../error');
            }
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
