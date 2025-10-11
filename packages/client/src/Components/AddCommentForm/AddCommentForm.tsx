import { useForm } from 'react-hook-form';
import { Button } from '../../Common/Blocks/Button';
import { Form } from '../../Common/Blocks/Form';

type TAddCommentForm = {
  content: string;
}

const fields = [{
  name: 'content' as const,
  label: 'Комментарий',
  type: 'text',
  options: {
    required: 'Обязательное поле',
  },
}];

export const AddCommentForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TAddCommentForm>();

  const onAddCommentSubmit = (data: TAddCommentForm) => {
    console.log(data);
  };

  return (
    <Form
      fields={fields}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onAddCommentSubmit)}
      submitButton={<Button stretched type="submit">Отправить</Button>}
    />
  );
};
