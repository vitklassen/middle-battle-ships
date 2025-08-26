import { clsx } from 'clsx';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormItem } from '../SignInUpForm/types';

import styles from './SignInUpForm.module.css';

import { submitData } from './types';

type Props = {
  signInUpFields: FormItem
  onSubmitHandler: (data: submitData) => void
  link: string
  linkText: string
}

export const SignInUpForm: FC<Props> = ({
  signInUpFields,
  onSubmitHandler,
  link,
  linkText,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: submitData) => {
    onSubmitHandler(data);
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
      <button className={clsx(styles.button)} type="submit">
        {signInUpFields.submitText}
      </button>
      <Link className={clsx(styles.link)} to={link}>
        {linkText}
      </Link>
    </form>
  );
};
