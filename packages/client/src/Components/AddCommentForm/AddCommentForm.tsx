import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Button } from '../../Common/Blocks/Button';
import { Form } from '../../Common/Blocks/Form';
import { addComment, createComment } from '../../Features/forum';
import { setError } from '../../Features/error';
import styles from './AddCommentForm.module.css';

type TAddCommentForm = {
  content: string;
}

const fields = [{
  name: 'content' as const,
  label: 'Комментарий',
  type: 'textarea',
  options: {
    required: 'Обязательное поле',
    maxLength: { value: 1000, message: 'Комментарий не может превышать 1000 символов' },
  },
}];

type Props = {
  commentId?: number;
  onSubmit?: VoidFunction;
  onClose?: VoidFunction;
}

export const AddCommentForm = ({ commentId, onSubmit, onClose }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TAddCommentForm>();

  const dispatch = useDispatch();

  const { id } = useParams();

  const onAddCommentSubmit = ({ content }: TAddCommentForm) => {
    createComment({ content, commentId, topicId: Number(id) })
      .then((comment) => {
        onSubmit?.();
        return dispatch(addComment(comment));
      })
      .catch((error) => dispatch(setError(error)));
  };

  return (
    <Form
      fields={fields}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onAddCommentSubmit)}
      submitButton={(
        <>
          <Button type="submit" className={styles.button}>Отправить</Button>
          <Button type="button" mode="secondary" className={styles.button} onClick={onClose}>Закрыть</Button>
        </>
)}
    />
  );
};
