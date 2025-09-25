import { useDispatch } from 'react-redux';
import { Snackbar } from '../../Common/Blocks/Snackbar';
import { resetError } from '../../Features/error';
import { useSelector } from '../../Store';

type Props = {
  modalRoot: HTMLElement | null
}

export const ErrorSnackbar = ({ modalRoot }: Props) => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error.value);
  const handleClose = () => {
    dispatch(resetError());
  };

  return (
    error && (
      <Snackbar message={error.reason} modalRoot={modalRoot} mode="error" onClose={handleClose} />
    )
  );
};
