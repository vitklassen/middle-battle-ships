import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '../../../Common/Blocks/Button';
import { Modal } from '../../../Common/Layouts/Modal';
import { CenteredLayout } from '../../../Common/Layouts/CenteredLayout';
import { Card } from '../../../Common/Blocks/Card';
import styles from './EditTopicModal.module.css';
import { Form } from '../../../Common/Blocks/Form';
import {
  editTopic, updateTopic,
} from '../../../Features/forum';
import { setError } from '../../../Features/error';
import { TEditTopicForm } from './types';

type Props = {
  setClosed: VoidFunction;
  topicId: number;
  form: TEditTopicForm;
};

const fields = [
  {
    name: 'title' as const,
    label: 'Заголовок',
    type: 'text',
    options: {
      required: 'Обязательное поле',
    },
  },
  {
    name: 'content' as const,
    label: 'Содержимое',
    type: 'textarea',
    options: {
      required: 'Обязательное поле',
    },
    className: styles.textarea,
  },
];

export const EditTopicModal: React.FC<Props> = ({ setClosed, topicId, form }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TEditTopicForm>({
    defaultValues: form,
  });

  const dispatch = useDispatch();

  const onSubmit = (data: TEditTopicForm) => {
    editTopic({ topicId, ...data })
      .then(() => {
        setClosed();
        return dispatch(updateTopic({ id: topicId, title: data.title, content: data.content }));
      })
      .catch((error) => dispatch(setError(error)));
  };

  return (
    <Modal onBackdropClick={setClosed}>
      <CenteredLayout>
        <Card>
          <h1 className={styles.title}>Редактирование темы</h1>
          <Form
            fields={fields}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            submitButton={(
              <>
                <Button
                  type="submit"
                  className={styles.button}
                >
                  Редактировать
                </Button>
                <Button
                  onClick={setClosed}
                  mode="secondary"
                  className={styles.button}
                >
                  Отмена
                </Button>
              </>
            )}
          />
        </Card>
      </CenteredLayout>
    </Modal>
  );
};
