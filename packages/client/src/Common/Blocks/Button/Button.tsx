import { PropsWithChildren } from 'react'
import styles from './Button.module.css'
import clsx from 'clsx'

type Props = {
  mode?: 'primary' | 'secondary'
  stretched?: boolean
  onClick?: React.MouseEventHandler
  className?: string
}

export const Button: React.FC<PropsWithChildren<Props>> = ({
  mode = 'primary',
  stretched,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        styles.button,
        mode === 'primary' && styles.buttonPrimary,
        mode === 'secondary' && styles.buttonSecondary,
        stretched && styles.buttonStretched
      )}>
      {children}
    </button>
  )
}
