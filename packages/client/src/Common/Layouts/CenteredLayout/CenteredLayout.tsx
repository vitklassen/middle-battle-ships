import { PropsWithChildren } from 'react';

import clsx from 'clsx';
import styles from './CenteredLayout.module.css';

type Props = {
  width?: string
  onlyVertically?: boolean
  onlyHorizontally?: boolean
  className?: string
}

export function CenteredLayout({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        styles.root,
        onlyHorizontally && styles.onlyHorizontally,
        onlyVertically && styles.onlyVertically,
        className
      )}
      style={{ width }}>
      {children}
    </div>;
  )
}
