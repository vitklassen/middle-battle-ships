/* eslint-disable jsx-a11y/control-has-associated-label */
import { clsx } from 'clsx';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormItem } from '../SignInUpForm/types';

import styles from './SignInUpForm.module.css';

import { submitData } from './types';
import { Button } from '../../Common/Blocks/Button';

type Props = {
  signInUpFields: FormItem
  onSubmitHandler: (data: submitData) => void
  onYandexAuthHandler?: (data: submitData) => void
  link: string
  linkText: string,
  yandexOathEnabled: boolean,
}

export const SignInUpForm: FC<Props> = ({
  signInUpFields,
  onSubmitHandler,
  onYandexAuthHandler,
  link,
  linkText,
  yandexOathEnabled,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: submitData) => {
    onSubmitHandler(data);
  };

  const onYandexAuth = () => {
    if (onYandexAuthHandler) {
      onYandexAuthHandler({ redirect_uri: window.location.origin });
    }
  };

  return (
    <form className={clsx(styles.form)} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={clsx(styles.header)}>{signInUpFields.pageName}</h1>
      {signInUpFields.fields.map(
        ({
          name,
          placeholder,
          requiredError,
          minLength,
          maxLength,
          pattern,
          type,
        }) => (
          <div key={name} className={clsx(styles.inputContainer)}>
            <span className={clsx(styles.inputName)}>{name}</span>
            <input
              className={clsx(styles.input)}
              id={name}
              placeholder={placeholder}
              type={type}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register(name, {
                required: requiredError,
                minLength,
                maxLength,
                pattern,
              })}
            />
            {errors[name] && (
              <p className={clsx(styles.errorText)}>
                {errors[name]?.message as string}
              </p>
            )}
          </div>
        ),
      )}
      <Button stretched className={clsx(styles.button)} type="submit">
        {signInUpFields.submitText}
      </Button>
      {yandexOathEnabled && (
        <>
          <span className={clsx(styles.additionalText)}>Войти через Яндекс</span>
          <button className={clsx(styles.yandexButton)} onClick={onYandexAuth} type="button" />
        </>
      )}
      <Link className={clsx(styles.link)} to={link}>
        {linkText}
      </Link>
    </form>
  );
};
