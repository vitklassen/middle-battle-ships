import { PropsWithChildren } from 'react'

import styles from './CenteredLayout.module.css'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const CenteredLayout = ({
  children,
  className,
}: PropsWithChildren<Props>) => {
  return <div className={clsx(styles.root, className)}>{children}</div>
}
