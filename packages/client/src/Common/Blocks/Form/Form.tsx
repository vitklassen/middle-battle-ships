import {
  FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister,
} from 'react-hook-form';
import clsx from 'clsx';
import { FormEventHandler, ReactNode } from 'react';
import styles from './Form.module.css';

type Field<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    type: string;
    options: RegisterOptions<T>;
}

type Props<T extends FieldValues> = {
    fields: Field<T>[];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    submitButton: ReactNode;
    onSubmit: FormEventHandler;
}

export function Form<T extends FieldValues>({
  fields, register, errors, submitButton, onSubmit,
}: Props<T>) {
  return (
    <form onSubmit={onSubmit}>
      {fields.map(({
        name, label, type, options,
      }) => (
        <div key={name} className={styles.field}>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...register(name, options)}
            type={type}
            placeholder={label}
            className={styles.input}
          />
          {errors[name] && (
          <span className={clsx(styles.error, styles.errorField)}>
            {errors[name].message}
          </span>
          )}
        </div>
      ))}
      {submitButton}
    </form>
  );
}
