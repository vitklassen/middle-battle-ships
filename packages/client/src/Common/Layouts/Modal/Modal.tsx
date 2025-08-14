import { createPortal } from 'react-dom'
import { CenteredLayout } from '../CenteredLayout'
import styles from './Modal.module.css'
import { useMemo } from 'react'

type Props = {
  onBackdropClick?: VoidFunction
}

export const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  onBackdropClick,
  children,
}) => {
  const modalRoot = useMemo(() => document.getElementById('modal'), [])

  if (!modalRoot) {
    throw Error('No modal root found')
  }

  return createPortal(
    <div className={styles.root}>
      <div onClick={onBackdropClick} className={styles.backdrop}></div>
      {children}
    </div>,
    modalRoot
  )
}
