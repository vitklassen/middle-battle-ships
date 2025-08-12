import { PropsWithChildren } from 'react'
import styles from './Button.module.css'
import clsx from 'clsx'

type Props = {
  mode?: 'primary' | 'secondary'
  stretched?: boolean
  className?: string
}

export const Button: React.FC<PropsWithChildren<Props>> = ({
  mode = 'primary',
  stretched,
  children,
  className,
}) => {
  return (
    <button
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
