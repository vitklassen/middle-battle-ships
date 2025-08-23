import clsx from 'clsx';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Card } from '../Card';
import closeIcon from '../../../assets/images/close.svg';

import styles from './Snackbar.module.css';

type Props = {
  message: string
  mode?: 'error'
  onClose?: VoidFunction
}

export const Snackbar: React.FC<Props> = ({ message, mode, onClose }) => {
  const modalRoot = useMemo(() => document.getElementById('modal'), []);

  if (!modalRoot) {
    throw Error('No modal root found');
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
