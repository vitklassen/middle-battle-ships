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
    className?: string;
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
        name, label, type, options, className,
      }) => (
        <div key={name} className={styles.field}>
          <label htmlFor={name}>{label}</label>
          {
            type === 'textarea' ? (
              <textarea
                id={name}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register(name, options)}
                placeholder={label}
                className={clsx(styles.input, styles.textarea, className)}
              />
            ) : (
              <input
                id={name}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register(name, options)}
                type={type}
                placeholder={label}
                className={clsx(styles.input, className)}
              />
            )
          }
          {errors[name] && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          <span className={clsx(styles.error, styles.errorField)}>{errors[name].message}</span>
          )}
        </div>
      ))}
      {submitButton}
    </form>
  );
}
