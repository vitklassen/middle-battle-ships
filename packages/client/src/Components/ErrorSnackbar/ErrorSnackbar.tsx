import { useDispatch } from 'react-redux';
import { Snackbar } from '../../Common/Blocks/Snackbar';
import { resetError } from '../../Features/error';
import { useSelector } from '../../Store';

export const ErrorSnackbar = () => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error.value);
  const handleClose = () => {
    dispatch(resetError());
  };

  return (
    error && (
      <Snackbar message={error.reason} mode="error" onClose={handleClose} />
    )
  );
};
