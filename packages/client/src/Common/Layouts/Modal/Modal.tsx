import { createPortal } from 'react-dom';
import { useMemo } from 'react';
import styles from './Modal.module.css';

type Props = {
  onBackdropClick?: VoidFunction
}

export const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  onBackdropClick,
  children,
}) => {
  const modalRoot = useMemo(() => document.getElementById('modal'), []);

  if (!modalRoot) {
    throw Error('No modal root found');
  }

  return createPortal(
    <div className={styles.root}>
      <div
        onClick={onBackdropClick}
        className={styles.backdrop}
        aria-hidden="true"
      />
      {children}
    </div>,
    modalRoot,
  );
};
