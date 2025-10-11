import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '../../../Common/Blocks/Button';
import { Modal } from '../../../Common/Layouts/Modal';
import { CenteredLayout } from '../../../Common/Layouts/CenteredLayout';
import { Card } from '../../../Common/Blocks/Card';
import { TCreateTopicForm } from './types';
import styles from './CreateTopicModal.module.css';
import { Form } from '../../../Common/Blocks/Form';
import { addTopic, createTopic } from '../../../Features/forum';
import { setError } from '../../../Features/error';

type Props = {
  setClosed: VoidFunction;
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
    type: 'text',
    options: {
      required: 'Обязательное поле',
    },
  },
];

export const CreateTopicModal: React.FC<Props> = ({ setClosed }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TCreateTopicForm>();

  const dispatch = useDispatch();

  const handleCreateTopicSubmit = (data: TCreateTopicForm) => {
    createTopic({ title: data.title, content: data.content })
      .then((topic) => {
        setClosed();
        return dispatch(addTopic(topic));
      })
      .catch((error) => dispatch(setError(error)));
  };

  return (
    <Modal onBackdropClick={setClosed}>
      <CenteredLayout>
        <Card>
          <h1 className={styles.title}>Создание новой темы</h1>
          <Form
            fields={fields}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(handleCreateTopicSubmit)}
            submitButton={(
              <Button
                stretched
                type="submit"
              >
                Создать
              </Button>
)}
          />
          <Button
            onClick={setClosed}
            stretched
            mode="secondary"
          >
            Отмена
          </Button>
        </Card>
      </CenteredLayout>
    </Modal>
  );
};
