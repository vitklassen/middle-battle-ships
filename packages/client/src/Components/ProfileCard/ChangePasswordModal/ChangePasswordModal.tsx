import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Modal } from '../../../Common/Layouts/Modal';
import styles from './ChangePasswordModal.module.css';
import { Button } from '../../../Common/Blocks/Button';
import { ChangePasswordForm } from './types';
import profileApi from '../../../api/profileApi';
import { CenteredLayout } from '../../../Common/Layouts/CenteredLayout';
import { Card } from '../../../Common/Blocks/Card';
import { Form } from '../../../Common/Blocks/Form';

const fields = [
  {
    name: 'oldPassword' as const,
    label: 'Старый пароль',
    type: 'password',
    options: {
      required: 'Обязательное поле',
    },
  },
  {
    name: 'newPassword' as const,
    label: 'Новый пароль',
    type: 'password',
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
  },
];

type Props = {
  setClosed: VoidFunction;
};

export const ChangePasswordModal: React.FC<Props> = ({ setClosed }) => {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const onSubmit = ({ oldPassword, newPassword }: ChangePasswordForm) => {
    profileApi
      .changePassword(oldPassword, newPassword)
      .then(() => {
        setClosed();
      })
      .catch(({ reason }) => {
        setError(reason);
      });
  };

  return (
    <Modal onBackdropClick={setClosed}>
      <CenteredLayout>
        <Card>
          <h1 className={styles.title}>Смена пароля</h1>
          <Form
            fields={fields}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            submitButton={(
              <Button stretched className={styles.button} type="submit">
                Изменить пароль
              </Button>
)}
          />
        </Card>
      </CenteredLayout>
    </Modal>
  );
};
