import { clsx } from 'clsx';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { SubmitData } from './types';
import { Form } from '../../Common/Blocks/Form';
import { Button } from '../../Common/Blocks/Button';
import { Card } from '../../Common/Blocks/Card';
import authApi from '../../api/authApi';
import { getProfile, loadThemeInfo, setProfile } from '../../Features/profile';
import { Path } from '../../Router';
import styles from './SignUpForm.module.css';

export const signUpFields = [
  {
    // Почта
    name: 'email' as const,
    requiredError: 'Необходимо заполнить поле',
    label: 'Почта',
    type: 'text',

    options: {
      required: 'Обязательное поле',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Некорректная почта',
      },
    },
  },
  {
    // Логин
    name: 'login' as const,
    requiredError: 'Необходимо заполнить поле',
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
    // Имя
    name: 'first_name' as const,
    requiredError: 'Необходимо заполнить поле',
    label: 'Имя',
    type: 'text',
    options: {
      required: 'Обязательное поле',
      pattern: {
        value: /^[A-ZА-ЯЁ][-a-zа-яё]+$/i,
        message: 'Некорректный запись',
      },
    },
  },
  {
    // Фамилия
    name: 'second_name' as const,
    requiredError: 'Необходимо заполнить поле',
    label: 'Фамилия',
    type: 'text',
    options: {
      required: 'Обязательное поле',
      pattern: {
        value: /^[A-ZА-ЯЁ][-a-zа-яё]+$/i,
        message: 'Некорректная запись',
      },
    },
  },
  {
    // Телефон
    name: 'phone' as const,
    requiredError: 'Необходимо заполнить поле',
    label: 'Телефон',
    type: 'text',
    options: {
      required: 'Обязательное поле',
      minLength: {
        value: 10,
        message: 'Номер должен быть не менее 8 символов', // JS only: <p>error message</p> TS only support string
      },
      maxLength: {
        value: 15,
        message: 'Номер должен быть не более 40 символов',
      },
      pattern: {
        value: /^[+0-9][0-9]+$/,
        message: 'Некорректный номер',
      },
    },
  },
  {
    // Пароль
    name: 'password' as const,
    requiredError: 'Необходимо заполнить поле',
    label: 'Пароль',
    options: {
      required: 'Обязательное поле',
      minLength: {
        value: 8,
        message: 'Пароль должен быть не менее 8 символов', // JS only: <p>error message</p> TS only support string
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
  {
    // Пароль (ещё раз)
    name: 'passwordAgain' as const,
    requiredError: 'Необходимо заполнить поле',
    label: 'Пароль (ещё раз)',
    options: {
      required: 'Обязательное поле',
      minLength: {
        value: 8,
        message: 'Пароль должен быть не менее 8 символов', // JS only: <p>error message</p> TS only support string
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

export const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: SubmitData) => {
    authApi.register(data).then((): void => {
      getProfile().then((profile) => {
        profile = loadThemeInfo(profile);
        dispatch(setProfile(profile));
        navigate(Path.Main);
      });
    });
  };

  return (
    <Card className={styles.container}>
      <h1 className={clsx(styles.header)}>Регистрация</h1>
      <Form
        fields={signUpFields}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        submitButton={(
          <Button stretched className={clsx(styles.button)} type="submit">
            Зарегистрироваться
          </Button>
        )}
      />
      <div className={styles.footer}>
        <Link className={clsx(styles.link)} to={Path.SignIn}>
          Есть аккаунт?
        </Link>
      </div>
    </Card>
  );
};
