import clsx from 'clsx';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Card } from '../Card';
import closeIcon from '../../../assets/images/close.svg';

import styles from './Snackbar.module.css';

type Props = {
  message: string
  modalRoot: HTMLElement | null
  mode?: 'error'
  onClose?: VoidFunction
}

export const Snackbar: React.FC<Props> = ({
  message, modalRoot, mode, onClose,
}) => {
  if (!modalRoot) {
    return;
  }

  return createPortal(
    <Card
      className={clsx(
        styles.snackbar,
        mode === 'error' && styles.snackbarError,
      )}
    >
      <button onClick={onClose} type="button" className={styles.closeButton}>
        <img src={closeIcon} alt="Закрыть" />
      </button>
      {message}
    </Card>,
    modalRoot,
  );
};
