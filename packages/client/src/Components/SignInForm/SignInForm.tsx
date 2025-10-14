/* eslint-disable jsx-a11y/control-has-associated-label */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Card } from '../../Common/Blocks/Card';
import { Form } from '../../Common/Blocks/Form';
import { Button } from '../../Common/Blocks/Button';
import authApi from '../../api/authApi';
import { SubmitData } from './types';
import {
  getProfile, setPositions, setProfile,
} from '../../Features/profile';
import { Path } from '../../Router';
import styles from './SignInForm.module.css';

const fields = [
  {
    name: 'login' as const,
    label: 'Логин',
    type: 'text',
    options: {
      required: 'Обязательное поле',
      minLength: {
        value: 3,
        message: 'Логин должен быть не менее 3 символов',
      },
      maxLength: {
        value: 20,
        message: 'Логин должен быть не более 20 символов',
      },
      pattern: {
        value: /^[a-zA-Z-_\d]*(?=[a-zA-Z])[a-zA-Z-_\d]*$/,
        message: 'Некорректный логин',
      },
    },
  },
  {
    name: 'password' as const,
    label: 'Пароль',
    options: {
      required: 'Обязательное поле',
      minLength: {
        value: 8,
        message: 'Пароль должен быть не менее 8 символов',
      },
      maxLength: {
        value: 40,
        message: 'Пароль должен быть не более 40 символов',
      },
      pattern: {
        value: /^.*[A-ZА-ЯЁ\d].*$/,
        message: 'Некорректный пароль',
      },
    },
    type: 'password',
  },
];

export const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data: SubmitData) => {
    authApi.login(data).then((): void => {
      getProfile().then((profile) => {
        dispatch(setProfile(profile));
        navigate(Path.Main);

        const handleSuccess = (event: GeolocationPosition) => {
          const { latitude, longitude } = event.coords;
          const positions = { latitude, longitude };
          dispatch(setPositions({ positions }));
        };

        navigator.geolocation.getCurrentPosition(handleSuccess);
      });
    });
  };

  const onYandexAuthHandler = (data: SubmitData) => {
    authApi.getYandexOAuthID(data).then((res): void => {
      const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.service_id}&redirect_uri=${data.redirect_uri}`;
      document.location.href = URL;
    });
  };

  return (
    <Card>
      <h1 className={styles.header}>Вход</h1>
      <Form
        fields={fields}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmitHandler)}
        submitButton={(
          <Button stretched className={styles.button} type="submit">Войти</Button>
)}
      />
      <div className={styles.footer}>
        <span className={styles.additionalText}>Войти через Яндекс</span>
        <button
          className={styles.yandexButton}
          onClick={() => {
            onYandexAuthHandler({ redirect_uri: window.location.origin });
          }}
          type="button"
        />
        <Link className={styles.link} to={Path.SignUp}>
          Нет аккаунта?
        </Link>
      </div>
    </Card>
  );
};
