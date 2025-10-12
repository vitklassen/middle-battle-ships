import { useForm } from 'react-hook-form';
import { Card } from '../../../Common/Blocks/Card';
import { Form } from '../../../Common/Blocks/Form';
import { CenteredLayout } from '../../../Common/Layouts/CenteredLayout';
import { Modal } from '../../../Common/Layouts/Modal';
import { Button } from '../../../Common/Blocks/Button';
import { AddCommentForm } from '../../../Components/AddCommentForm';

type Props = {
    setClosed: VoidFunction;
}

export const AddCommentModal = ({ setClosed }: Props) => (
  <Modal onBackdropClick={setClosed}>
    <CenteredLayout><Card><AddCommentForm onSubmit={setClosed} onClose={setClosed} /></Card></CenteredLayout>
  </Modal>
);
