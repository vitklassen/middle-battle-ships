import { createPortal } from 'react-dom'
import { CenteredLayout } from '../CenteredLayout'
import styles from './Modal.module.css'
import { useMemo, useState } from 'react'

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    console.log('kek')
    onBackdropClick?.()
  }

  return createPortal(
    <div className={styles.root}>
      <div onClick={handleBackdropClick} className={styles.backdrop}></div>
      <CenteredLayout>
        <div className={styles.card}>{children}</div>
      </CenteredLayout>
    </div>,
    modalRoot
  )
}
