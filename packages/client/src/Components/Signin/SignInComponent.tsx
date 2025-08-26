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
    console.log(data);
    authApi.login(data).then((): void => {
      getProfile().then((profile) => {
        dispatch(setProfile(profile));
        navigate(Path.Main);
      });
    });
  };

  return (
    <div className={clsx(styles.root)}>
      <SignInUpForm
        signInUpFields={signInFields}
        onSubmitHandler={onSubmitHandler}
        link={Path.SignUp}
        linkText="Нет аккаунта?"
      />
    </div>
  );
};
